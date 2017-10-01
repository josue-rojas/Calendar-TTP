def countWays(c):
    if(c < 0):
        return 0
    elif (c == 0):
        return 1
    return  countWays((c - 1)) + countWays((c - 2)) + countWays((c - 3))
print countWays(3)
