from random import shuffle
# from solo import Planet

# print('='*100)
# p = Planet(1202)
# # p.cmethod()
# print(f'{"20":10} - last')

# word = list('abululu')
# # print(word)
# shuffle(word)
# # print(word)
# l = [x**2 for x in [1, 2, 3, 4]]
# # print(l)
# l = [(lambda y:y**2)(x) for x in [1, 2, 3, 4]]
# # print(l)


def put(cb):
    def wrapper():
        print('before')
        # cb('baba')
        print('after')
    return wrapper


@put
def printMe(name):
    print(f'hello, {name}')


# printMe('fattylee')
se = {1, 1, 2, 2, 3}
se.add(12)
se.remove(1)
se.remove(2)
print(type(se))
# print(sqie)
