# to store url address we can seperate the address into parts, it can be by character or it can be a bit bigger like the seperated by '/'. After we seperate them we can use a hash that can work like a tree connecting the key to the next key until it reaches the end. this way we remove the repetiveness of the beginning of links. I googled the type of tree just to make sure, it is called a trie tree or prefix tree. Anyway a tree only holds the neccesery information as where a  hash needs to allocate extra space.
# Python doesn't have hash so I am going to use dictionaries which has a key and value
# I am also not going to split the urls by character rather than the '/' seperation because the repetiveness usually happens in the beginning of the url

visited=dict()

# checks the url if it isnt in the dictionary then return false and add the endint to say it is there else return true
def checkVisited(url):
    urlSp = url.split('/')
    curDic = visited
    for pref in range(len(urlSp)):
        curDic = curDic.setdefault(urlSp.pop(0),{})
    if len(curDic) < 1:
        curDic.setdefault('end',True)
        return False
    return True


print 'Return False: ' + str(checkVisited('google.com/somehting'))
print 'Return True: ' + str(checkVisited('google.com/somehting'))
print 'Return False: ' + str(checkVisited('google.com/somehting/else'))
print 'Return True: ' + str(checkVisited('google.com/somehting'))
print 'Return True: ' + str(checkVisited('google.com/somehting/else'))
print 'Return False: ' + str(checkVisited('google.com/somehting/elsenot'))
print 'Return False: ' + str(checkVisited('github.com'))
print 'Return True: ' + str(checkVisited('github.com'))
