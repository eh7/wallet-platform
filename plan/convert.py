import markdown, sys
# Open the file for reading and read the input to a temp variable
# with open('../3PhaseDevelopmentStructure.md', 'r') as f:
with open(sys.argv[1], 'r') as f:
    tempMd= f.read()

# Convert the input to HTML
tempHtml = markdown.markdown(tempMd)
# If necessary, could print or edit the results at this point.
# Open the HTML file and write the output.
with open('/tmp/' + sys.argv[1].replace('../', '') + '.html', 'w') as f:
    f.write(tempHtml)

print(sys.argv[1] + ' -> ' + '/tmp/' + sys.argv[1].replace('../', '') + '.html')
