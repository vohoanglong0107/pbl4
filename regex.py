import re
 
 
alphabets= "([A-Za-z])"
 
 
def tach_cau(text):
    text = " " + text + "  "
    text = text.replace("\n"," ")
    #text = re.sub("\s" + alphabets + "[.] "," \\1<prd> ",text)
    text = re.sub(alphabets + "[.]" + alphabets + "[.]" + alphabets + "[.]","\\1<prd>\\2<prd>\\3<prd>",text)
    text = re.sub(alphabets + "[.]" + alphabets + "[.]","\\1<prd>\\2<prd>",text)
    #text = re.sub(" " + alphabets + "[.]"," \\1<prd>",text)
    if "”" in text: text = text.replace(".”","”.")
    if "\"" in text: text = text.replace(".\"","\".")
    if "!" in text: text = text.replace("!\"","\"!")
    if "?" in text: text = text.replace("?\"","\"?")
    text = text.replace(".",".<stop>")
    text = text.replace("?","?<stop>")
    text = text.replace("!","!<stop>")
    text = text.replace("<prd>",".")
    sentences = text.split("<stop>")
    sentences = sentences[:-1]
    sentences = [s.strip() for s in sentences]
    return sentences
 
 
text ='''
day la van ban, co nhieu ngu phap trong nay? tach casi nya ra.
day van la doan van , ở dưới là caai hỏi . ok chưa.
day la cau hoi. 
A. Cau a.   B. Cau b.
C. Cau c.   D. Cau d.
'''
 
 
a = tach_cau(text)
print(len(a))
 
stri = ""
for i in range(len(a)-9):
    stri += str(a[i])+ " "
# print(a[0:2])
print("cai ni la doan van: " +stri)
print("cai ni la cau hoi: " +a[len(a)-9])
print("cai ni la cau a:" +a[len(a)-7])
print("cai ni la cau a:" +a[len(a)-5])
print("cai ni la cau a:" +a[len(a)-3])
print("cai ni la cau a:" +a[len(a)-1])

 