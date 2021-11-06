import re


alphabets= "([A-Za-z])"


def tach_cau(text):
    text = " " + text + "  "
    text = text.replace("\n"," ")
    text = re.sub("\s" + alphabets + "[.] "," \\1<prd> ",text)
    text = re.sub(alphabets + "[.]" + alphabets + "[.]" + alphabets + "[.]","\\1<prd>\\2<prd>\\3<prd>",text)
    text = re.sub(alphabets + "[.]" + alphabets + "[.]","\\1<prd>\\2<prd>",text)
    text = re.sub(" " + alphabets + "[.]"," \\1<prd>",text)
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
day la cau hoi. 
A. Cau a.   B. Cau b.
C. Cau c.   D. Cau d.
'''


a = tach_cau(text)

stri = ""

for i in range(len(a)-1):
    stri += str(a[i])+ " "
# print(a[0:2])
print(stri)
print(a[2])



# def lay_cau(text):
#     tach_cau(text)
#     for i in 

# import re
# import nltk
# from nltk import tokenize

# rx_sequence = re.compile(r"^(.+?)\n\n((?:[A-Z]+\n)+)",re.MULTILINE)
# rx_blanks = re.compile(r"\W+") # to remove blanks and newlines


# text ='''
# day la van ban.
# day la cau hoi.
# A.Cau a.   B.Cau b.
# C.Cau c.   D.Cau d.
# '''


# print(tokenize.sent_tokenize(text))










# re.compile(r"^(.+)(?:\n|\r\n?)((?:(?:\n|\r\n?).+)+)", re.MULTILINE)


# for match in rx_sequence.finditer(text):
#     title, sequence = match.groups()
#     title = title.strip()
#     sequence = rx_blanks.sub("",sequence)
#     print ("Title:",title)
#     print ("Sequence:",sequence)
#     print
# pt = "(.|\n)*"

# str = re.findall(pt, chuoi)

# print(re.findall("A.+", chuoi))
# print(re.findall("B.+", chuoi))
# print(re.findall("C.+", chuoi))
# print(re.findall("D.+", chuoi))

