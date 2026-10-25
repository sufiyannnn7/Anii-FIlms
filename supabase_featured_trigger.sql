-- Trigger to ensure only one featured video exists per project
CREATE OR REPLACE FUNCTION ensure_single_featured_video()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_featured = true THEN
    UPDATE project_videos
    SET is_featured = false
    WHERE project_id = NEW.project_id
      AND id != NEW.id
      AND is_featured = true;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_single_featured_video ON project_videos;
CREATE TRIGGER trigger_single_featured_video
BEFORE INSERT OR UPDATE ON project_videos
FOR EACH ROW
EXECUTE FUNCTION ensure_single_featured_video();

-- Reload schema
NOTIFY pgrst, 'reload schema';
