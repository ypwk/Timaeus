list = [
    "hu_tao",
    "jean",
    "kaedehara_kazuha",
    "kaeya",
    "kamisato_ayaka",
    "keqing",
    "klee",
    "kujou_sara",
    "lisa",
    "mona",
    "ningguang",
    "noelle",
    "qiqi",
    "raiden_shogun",
    "razor",
    "rosaria",
    "sangonomiya_kokomi",
    "sayu",
    "sucrose",
    "tartaglia",
    "thoma",
    "traveler_anemo",
    "traveler_electro",
    "traveler_geo",
    "venti",
    "xiangling",
    "xiao",
    "xingqiu",
    "yanfei",
    "yoimiya",
    "zhongli"
]

for a in list:
    f = open(a + ".js", "a")
    f.write("export const " + a + "_data = ")
    f.close()