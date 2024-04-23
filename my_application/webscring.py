import requests as re
import pandas as pd 

'''a=re.get("https://www.google.com/")
b=a.text
print(b)
'''

tables= pd.read_html('https://en.wikipedia.org/wiki/List_of_S%26P_500_companies')

print(tables)