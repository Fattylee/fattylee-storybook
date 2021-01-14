name = 'abu'


def printName(name=['default']):
    # global name
    name .append('prefix '+name[len(name)-1])
    # print(name)
    # print('='*100)
    return name


# res = printName()
res = printName()
# print(res)
# print(name)

# print(list(range(10, 0, -2)))
# print([x**2 for x in range(10) if x % 2 == 0])
# print([x**2 for x in range(10) if not x % 2])


class Animal():
    def __init__(self, name):
        self.__name = name

    def hello(self):
        print(self.__name)


class Man(Animal):
    age = 8

    def __init__(self, name, age):
        super().__init__(name)
        self.age = age
        # self.name = name

    @classmethod
    def man(cls):
        print('{} classmethod'.format('Hi,'))
        return cls('mango', 23)


# man = Man.man()
# print(man.age)
cat = Animal('super cat')
# cat.hello()
man = Man('abu', 21)
# man.hello()
# print(man.age)
# print(man.name, man.age)

l = [1, 2, 3, 4, 5]
l.remove(5)
l.reverse()
l.pop(2)
# print(l)


class Planet:
    name = 'planet'

    def __init__(self, age):
        self.age = age
        self.b4 = self.name
        self.name = 'zero'

    @classmethod
    def cmethod(cls):
        print('class method')
        pass


p = Planet(200)
print(f'Planet name: {Planet.name}\ninstance: {p.name}')
print(p.b4)
Planet.cmethod()
p.cmethod()
