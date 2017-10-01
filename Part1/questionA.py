# Question A -- sortByStrings(s,t): Sort the letters in the string s by the order they occur in the string t. You can assume t will not have repetitive characters. For s = "weather" and t = "therapyw", the output should be sortByString(s, t) = "theeraw". For s = "good" and t = "odg", the output should be sortByString(s, t) = "oodg".
from collections import Counter

# first count the letters in s for each letter, then got through the letters in t to sort
#if any other letter is left then add them at the end (just in case) it is not in t
def sortByString(s, t):
    sCount = Counter(s) #count the letter for each
    sortedSt = ''
    for letter in t:
        sortedSt += ''.join([letter for i in range(sCount.pop(letter,0))])
    # using sets cause it's order and dict/counter isnt
    # plus it will only go here if there is something left
    for letterLeft in set(s)  - set(t): # maybe sort the letter here by default abc...
        sortedSt += ''.join(letterLeft for j in range(sCount.pop(letterLeft,0)))
    return sortedSt

print sortByString('weather', 'therapyw')
print sortByString('good', 'odg')

# case where s contains letters not in t
print sortByString('chiicken', 'chn')
