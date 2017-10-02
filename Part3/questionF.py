# not exactly the answer but starting to get some idea
# just need to remove repetitives and display the answer neatly
# i think there is a better way
import re # for splitting and cleaning data

change = ''
def countWays(c, minus=0, change=change, denominations=[1,2,3]):
    c -= minus
    if(c < 0):
        return ''
    else:
        change+= '' if minus == 0 else str(minus)
        print change + '  <-change:minus->  ' + str(minus)
    if c == 0:
        return change + ' '
    return ','.join([str(countWays(c, d, change, denominations)) for d in denominations])
    # return  str(countWays(c, -1, change)) + str(countWays(c, -2, change)) + str(countWays(c, -3, change))

def changePossibilities(amount, denominations):
    data = countWays(4,denominations=denominations)
    cleanData = filter(None,re.split('\s?,*\s?',data)) # clean data
    # remove duplicates
    noDups = dict()
    for possibility in cleanData:
        noDups.setdefault(''.join(sorted(possibility)),0)
    return noDups.keys()
    # clean data
    # somewhatClean = data.split(' ')
    # print data
#     # print data
#     clean = []
#     for possibility in somewhatClean:
#         clean.append(possibility.replace(',',''))
#     # print clean
# #     print countWays(amount, 0)
# #     return len(allPoss)

print changePossibilities(4, [3,2,1])
