import re


# pattern = re.compile(r'\d*?\[.*\]')
# string = re.compile(r'\[.*\]')
# digits = re.compile(r'\d*')
#
# def decodeString(s):
#     matches = pattern.findall(s)
#     string = patter
#     for match in matches:
#         for i in range(digits.match(s).group(0)):
#
#
#     return pattern.findall(s)

def isInt(s):
    try:
        int(s)
        return True
    except ValueError:
        return False


def decodeString(s):
    curD = 0
    curS = 0
    digits = ['']
    strings = ['']
    returnS = ''
    for letter in s:
        if isInt(letter):
            digits[curD] += letter
        elif letter == '[':
            curD+=1
            curS+=1
            digits.append('')
            strings.append('')
            continue
        elif letter == ']':
            curD-=1
            curS-=1
            repeat = strings.pop()
            numRepeat = digits.pop()
            numRepeat = numRepeat if numRepeat != '' else digits.pop()
            for r in range(int(numRepeat)):
                returnS+=repeat
            if curS > 0:
                strings[-1]+=returnS
                returnS = strings[-1]
        else:
            strings[curS] += letter
    return returnS

print decodeString("4[ab]")
print decodeString("2[b3[a]]")
