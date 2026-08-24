import os

replacements = {
    "text-slate-900": "text-foreground",
    "text-slate-800": "text-foreground",
    "text-slate-700": "text-foreground",
    "text-slate-600": "text-muted-foreground",
    "text-slate-500": "text-muted-foreground",
    "bg-slate-50": "bg-background",
    "bg-[#F8FAFC]": "bg-background",
    "bg-white": "bg-card",
    "border-slate-200": "border-border",
    "border-slate-100": "border-border"
}

def process_dir(directory):
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith('.tsx'):
                path = os.path.join(root, file)
                with open(path, 'r') as f:
                    content = f.read()
                
                original_content = content
                for k, v in replacements.items():
                    content = content.replace(k, v)
                
                if content != original_content:
                    with open(path, 'w') as f:
                        f.write(content)
                    print(f"Updated {path}")

process_dir('src/pages')
process_dir('src/components/layout')
