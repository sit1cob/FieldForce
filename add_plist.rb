
require 'xcodeproj'
project_path = 'ios/FieldForceRN.xcodeproj'
project = Xcodeproj::Project.open(project_path)
group = project.main_group['FieldForceRN']

if group.nil?
  puts "Group 'FieldForceRN' not found, creating it"
  group = project.main_group.new_group('FieldForceRN')
end

# Check if file ref already exists to avoid duplicates
existing_ref = group.files.find { |f| f.path == 'GoogleService-Info.plist' }
if existing_ref
    puts "File reference already exists"
    file = existing_ref
else
    file = group.new_file('GoogleService-Info.plist') # It's relative to the group if group has path, or if added relative to project
    # Since we moved it to ios/FieldForceRN/GoogleService-Info.plist and project is in ios/
    # The main group usually has no path, or is root. 
    # 'FieldForceRN' group usually corresponds to 'FieldForceRN' folder.
    # checking file path registry.
    # Let's try adding it with specific path.
    file.path = 'GoogleService-Info.plist' # Relative to group
end

project.targets.each do |target|
  if target.name == 'FieldForceRN'
    # Check if build file exists
    exists = target.resources_build_phase.files.any? { |bf| bf.file_ref && bf.file_ref.path == 'GoogleService-Info.plist' }
    if !exists
        target.add_resources([file])
        puts "Added to target resources"
    else
        puts "Already in target resources"
    end
  end
end
project.save
puts "Finished configuration"
