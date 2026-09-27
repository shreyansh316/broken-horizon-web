import re
content = open(r'e:\GameDev\Broken_Horizon_Interactive_Site\src\data\worldData.ts', encoding='utf-8').read()
m = re.search(r'export const worldRegions.*?=\s*\[(.*?)\];', content, re.DOTALL)
if m:
    districts = re.findall(r'id:\s*"([^"]+)"', m.group(1))
    print(districts)
