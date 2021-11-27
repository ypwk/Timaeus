list = [
    "albedo",
    "aloy",
    "amber",
    "barbara",
    "beidou",
    "bennett",
    "chongyun",
    "diluc",
    "diona",
    "eula",
    "fischl",
    "ganyu",
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
    "xinyan",
    "yanfei",
    "yoimiya",
    "zhongli"
]

#f = open("index.js", "a")
#for a in list:
#    f.write("export { " + a + "_data } from \"./" + a + ".js\"\n")
#f.close()
for a in list:
    print("\"" + a + "\" : charDetailedData." + a + "_data,")