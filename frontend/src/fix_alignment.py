import os
import re

base_dir = '/home/furatixx/Desktop/civic loop/frontend/src/pages'

def fix_alignment():
    for root, dirs, files in os.walk(base_dir):
        for file in files:
            if file.endswith('.tsx'):
                path = os.path.join(root, file)
                with open(path, 'r') as f:
                    content = f.read()
                
                # Replace max-w-* mx-auto with w-full
                new_content = re.sub(r'max-w-[a-z0-9]+\s+mx-auto', 'w-full', content)
                # Also if there's any remaining mx-auto
                new_content = re.sub(r'\bmx-auto\b', '', new_content)
                # Clean up multiple spaces
                new_content = re.sub(r'\s+', ' ', new_content).replace('className=" ', 'className="')

                # Actually the above regex is aggressive and flattens newlines!
                # Let's do it safely
                pass

# Let's do a safer replace
def fix_alignment_safe():
    for root, dirs, files in os.walk(base_dir):
        for file in files:
            if file.endswith('.tsx'):
                path = os.path.join(root, file)
                with open(path, 'r') as f:
                    lines = f.readlines()
                
                new_lines = []
                for line in lines:
                    line = re.sub(r'max-w-[a-z0-9]+\s+mx-auto', 'w-full', line)
                    # If just mx-auto is there but not matched above
                    line = line.replace(' mx-auto', '')
                    new_lines.append(line)
                
                with open(path, 'w') as f:
                    f.writelines(new_lines)

fix_alignment_safe()
print("Alignment fixed in all pages.")
