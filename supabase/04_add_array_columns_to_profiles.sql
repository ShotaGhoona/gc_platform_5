-- Add array columns to profiles table and migrate existing data

-- 1. Add new array columns
ALTER TABLE profiles 
ADD COLUMN interests_array TEXT[],
ADD COLUMN core_skills_array TEXT[];

-- 2. Migrate existing data from relational tables to arrays
-- Migrate interests
UPDATE profiles 
SET interests_array = (
    SELECT ARRAY_AGG(i.name)
    FROM profile_interest pi
    JOIN interests i ON pi.interest_id = i.id
    WHERE pi.profile_id = profiles.id
);

-- Migrate core_skills
UPDATE profiles 
SET core_skills_array = (
    SELECT ARRAY_AGG(cs.name)
    FROM profile_core_skill pcs
    JOIN core_skills cs ON pcs.core_skill_id = cs.id
    WHERE pcs.profile_id = profiles.id
);

-- 3. Handle NULL arrays (set empty arrays instead of NULL)
UPDATE profiles 
SET interests_array = '{}' 
WHERE interests_array IS NULL;

UPDATE profiles 
SET core_skills_array = '{}' 
WHERE core_skills_array IS NULL;

-- 4. Optional: Drop intermediate tables (uncomment if you want to remove them completely)
-- DROP TABLE IF EXISTS profile_interest;
-- DROP TABLE IF EXISTS profile_core_skill;

-- Note: interests and core_skills tables are kept as they might be used for validation or UI options