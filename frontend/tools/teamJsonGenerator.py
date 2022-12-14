import json
 
 
# Function to parse JSON file and make a new JSON file
# To clean output, use find+replace with following commands:
# 1. "name" to name
# 2. "iconUrl" to iconUrl
# 3. "sport": "Sport.XXX" to sport: Sport.XXX

# Takes the file paths as arguments
def make_json(inputFilePath, outputFilePath):
     
    fullData = []
     
    with open(inputFilePath, 'r', encoding='utf-8') as f:
        my_data = json.load(f)

        teams_list = my_data['sports'][0]['leagues'][0]


        for i in teams_list['teams']:
            displayName = i['team']['displayName']
            icon  = i['team']['logos'][2]['href']
            newTeam = {"name": displayName, "iconUrl": icon, "sport": "Sport.MLB"}
            fullData.append(newTeam)

    f.close()

    with open(outpuFilePath, 'w', encoding='utf-8') as jsonf:
        jsonf.write(json.dumps(fullData, indent=4))

         
# Driver Code
 
# Decide the two file paths according to your
# computer system
inputFilePath = r'frontend/tools/io/input.json'
outpuFilePath = r'frontend/tools/io/output.txt'
 
# Call the make_json function
make_json(inputFilePath, outpuFilePath)



