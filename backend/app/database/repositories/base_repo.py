from app.database.session import SessionLocal
import logging
import time
from sqlalchemy.exc import OperationalError, IntegrityError

# ログ設定
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# リトライ設定
MAX_RETRIES = 3  # 最大リトライ回数
RETRY_DELAY = 0.5  # リトライ間の待機時間（秒）

def is_deadlock_or_lock_timeout(e):
    """
    例外がデッドロックまたはロックタイムアウトかどうかを判定する
    """
    error_msg = str(e).lower()
    return (
        "deadlock" in error_msg or
        "lock timeout" in error_msg or
        "lock wait timeout" in error_msg or
        "could not serialize access" in error_msg
    )

class BaseRepository:
    def __init__(self, session=None):
        if session is None:
            self.session = SessionLocal()
            self._is_session_external = False
        else:
            self.session = session
            self._is_session_external = True
            
    def close(self):
        if not self._is_session_external:
            self.session.close()
            
    def add(self, entity):
        """
        エンティティをデータベースに追加する。
        デッドロックや競合が発生した場合は、最大MAX_RETRIES回リトライする。
        
        Args:
            entity: 追加するエンティティ
            
        Returns:
            追加されたエンティティ
        """
        retries = 0
        while True:
            try:
                self.session.add(entity)
                self.session.flush()
                return entity
            except (OperationalError, IntegrityError) as e:
                # デッドロックや競合が発生した場合、リトライする
                if is_deadlock_or_lock_timeout(e) and retries < MAX_RETRIES:
                    retries += 1
                    logger.warning(f"add操作でデッドロックまたは競合が発生しました。リトライ {retries}/{MAX_RETRIES}: {e}")
                    time.sleep(RETRY_DELAY * retries)  # 指数バックオフ
                    continue
                # リトライ回数を超えた場合や、デッドロック以外のエラーの場合は例外を発生させる
                logger.error(f"add操作でエラーが発生しました: {e}")
                raise
            except Exception as e:
                logger.error(f"add操作で予期しないエラーが発生しました: {e}")
                raise
                
    def update(self, entity):
        """
        エンティティを更新する。
        デッドロックや競合が発生した場合は、最大MAX_RETRIES回リトライする。
        
        Args:
            entity: 更新するエンティティ
            
        Returns:
            更新されたエンティティ
        """
        retries = 0
        while True:
            try:
                self.session.flush()
                return entity
            except (OperationalError, IntegrityError) as e:
                # デッドロックや競合が発生した場合、リトライする
                if is_deadlock_or_lock_timeout(e) and retries < MAX_RETRIES:
                    retries += 1
                    logger.warning(f"update操作でデッドロックまたは競合が発生しました。リトライ {retries}/{MAX_RETRIES}: {e}")
                    time.sleep(RETRY_DELAY * retries)  # 指数バックオフ
                    continue
                # リトライ回数を超えた場合や、デッドロック以外のエラーの場合は例外を発生させる
                logger.error(f"update操作でエラーが発生しました: {e}")
                raise
            except Exception as e:
                logger.error(f"update操作で予期しないエラーが発生しました: {e}")
                raise

