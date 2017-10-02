# not exactly the answer but starting to get some idea

change = ''
def countWays(c, minus, change=change):
    c += minus
    if(c < 0):
        return 0
    else:
        change+= '' if minus == 0 else str(-minus)
        print change + '  <-change:minus->  ' + str(minus)
         # print c
    if c == 0:
        return change + ' '
    return  str(countWays(c, -1, change)) + str(countWays(c, -2, change)) + str(countWays(c, -3, change))
# print countWays(3)

# def changePossibilities(amount, denominations):
#     print countWays(amount, 0)
#     return len(allPoss)

# print countWays(4, 0)
print countWays(4, 0)
