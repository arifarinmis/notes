(function() {
'use strict';

// Pre-generated 1,000 unique NFC user links for https://notes.thingsyourneed.com
const APP_DOMAIN = 'https://notes.thingsyourneed.com';
const INITIAL_TOKENS = [
  "e47ps8z5s4",
  "desdk8czbq",
  "ts2zagvn6k",
  "vaxdn8kgdv",
  "jcc975jxr2",
  "q7y9ruscvz",
  "g7z4k9pmqa",
  "q9p4wdryqd",
  "bw6gytx8yh",
  "8hv23xf697",
  "p86e9jynfp",
  "bd8bjjkpwh",
  "cbmue42bf9",
  "55mmccw3rq",
  "5nfjtbrwkh",
  "d68e3vgrpm",
  "5t52fvyprj",
  "ncgj69r3f6",
  "varpdbxkt9",
  "vr46mdv8qj",
  "8ks2b3wd8b",
  "cka5jus5my",
  "jjt44wct7u",
  "3egnttm3mq",
  "j6wxhjcj87",
  "w2hekj548p",
  "ug2aqdh7xb",
  "h59km3d7r6",
  "e97rzgcbpp",
  "h2rfaasges",
  "bykngsbkha",
  "zbr67k5362",
  "ydyzy3fs9a",
  "pds5xy8msm",
  "4zvewam76m",
  "jqdw6mz5sg",
  "jwsyb65dev",
  "6p2uybrwdu",
  "u9rf3hcczq",
  "qh9ya83mhb",
  "ufpd29fxfa",
  "k27s4g2k54",
  "jb7jgzx44p",
  "dhthxh26ad",
  "7c638xpvsp",
  "5bda2e337w",
  "nkktypxyxj",
  "j4cy5qg5fz",
  "junr9vyudy",
  "rw2z7q5xhz",
  "6y7ukd8yt2",
  "4v65t7bh9f",
  "rm5ake8un5",
  "cnns8y6vvb",
  "xf72gxzd27",
  "3kpgqw5erq",
  "6ckj7k8sbx",
  "aq6a76kwp5",
  "h7ehwgtkyk",
  "9asj9qn5dm",
  "g52s95x23k",
  "ww7rpxxt93",
  "56m9u6wn25",
  "qdnrv8fpg9",
  "5dhs6q35uu",
  "tucfvk8p5b",
  "25byf2r533",
  "z7k3tcegfs",
  "yaqfv6d9xz",
  "rh8dhnk84a",
  "8yr2ztawam",
  "8dd6s6njb6",
  "e4fhp5w2jv",
  "eq26ed4dc4",
  "ugf6r92hq3",
  "3ws734nrbk",
  "bzgdfh97yv",
  "5x4w79fkmj",
  "rgqe4qjf4w",
  "vndv4wq65q",
  "5x4qm9ttxs",
  "fp6brhesed",
  "8txaxf6aga",
  "wueq6khmwe",
  "jshvkwu6yc",
  "db44wufk82",
  "k68ww3qzcd",
  "hr6g23hjnd",
  "ar5rapm7b5",
  "5yfare7mxg",
  "k7reqwew5c",
  "k84j5de2ew",
  "9pcucs5zqp",
  "2bujaxrhrj",
  "ydxr39vy55",
  "xdawscdf4r",
  "2ry7vm256h",
  "gfk6emmmmj",
  "6ts9h4mk32",
  "cpf8gkveea",
  "9uy2xf545j",
  "ep5jp4sqaq",
  "hgxj7mw2yh",
  "nr3a3k7vbf",
  "myywgpjx3u",
  "7vx7qmutu5",
  "ekktxbeb78",
  "5zad8mjh2g",
  "yc25ap9ed2",
  "asm7yp22bj",
  "p3mgt633rw",
  "3jpax73qsp",
  "n6z5fajezg",
  "s3mmuz3c2f",
  "ypgdyn7tc4",
  "89d7bs5zwj",
  "f2xb74appf",
  "yqeqxdggrk",
  "cwjxqsctyz",
  "vmmuwsh35t",
  "dg3gpzywqk",
  "xsc6htxbsn",
  "58mdmpse3s",
  "mn9hgkbzq4",
  "4s2ge27q22",
  "pdhe9bjcr9",
  "kafj7e6h2x",
  "2g87t2k5e7",
  "4cdq9c4er3",
  "5a9ycws2u9",
  "z7pqfcbjhy",
  "ppbgn5xebq",
  "5e3zuz748t",
  "h5ax38z3wt",
  "dqxkb4b8pe",
  "yf3bbnzz7h",
  "hcmaan87wj",
  "u9dr83d8av",
  "y2weux579s",
  "6bgwdhpsqq",
  "m9jhp84b55",
  "3rmjnnf28x",
  "6kfhm8anab",
  "9zyx4jea72",
  "v4t2bs5vgb",
  "nd3a2sbu6d",
  "2fnfm5q254",
  "x24nzh364n",
  "ymkswbb4ta",
  "gfvdvk9jvt",
  "m7fe8uhpx5",
  "f8dknvawdm",
  "sdexvggcgm",
  "2jcag8hkgk",
  "2yc6c3y4j2",
  "few8464zj4",
  "s7d5khpm62",
  "9d3xasqfqm",
  "p53f9xnw65",
  "veebshaze8",
  "cr9bmhzynd",
  "hr4bhfnfdh",
  "e2vj43x57c",
  "eq82wmw3s3",
  "q56zkqpy35",
  "pgumvt8tqf",
  "7rz5ukfj5g",
  "b7fkqtmg85",
  "8xr3p9qpkw",
  "spjbueq4ex",
  "c2we87m6yf",
  "a69xybehxk",
  "tw5s3f4a4d",
  "xmvbh2h3cw",
  "sddhu2njed",
  "8fv72wk2tf",
  "6zgd9zbtf8",
  "c7yn4dgjfw",
  "jm363f42ka",
  "hmtw3prew9",
  "aw6zzzkyy8",
  "uukap8fsur",
  "c5vcv2q4t2",
  "tyeq2xvcg5",
  "kezygtze4n",
  "qdedzedw8d",
  "tfqr8wss3z",
  "f8396fw5t6",
  "rnrve7m9zu",
  "qh2gphdb7x",
  "jmncd2vefx",
  "7e9g5zvcve",
  "c8ygkbvbkp",
  "mqg9k4uae8",
  "hzgqjuqwhp",
  "g6cg656a5a",
  "bv3qgcy6x6",
  "zx2jqvmdc4",
  "qxv4eg8a89",
  "y9v2ep98cq",
  "pprk9hpbzq",
  "aeb6p3t5tw",
  "yy2jjgyz6u",
  "btvswwqu48",
  "qw4ebpn4b3",
  "r7w8kbp9v2",
  "wd8sfuj8d4",
  "s9rh6pdux5",
  "dypeqvtmce",
  "j4rtsea5uj",
  "74zcpzjr22",
  "kdtnhxguqu",
  "cakb5ku5u2",
  "w8bnmtzjv5",
  "m4fae8ax5z",
  "m8v5cujvtx",
  "34by7rryr3",
  "wbdbjz6egh",
  "mrdfj9hpke",
  "nzarpmhqj8",
  "zbsq84ny3m",
  "gt5r25w2zk",
  "nybea89rw9",
  "qxdnmcvjya",
  "47tudmbjzx",
  "tgrszpqhqx",
  "g74uvdxcu4",
  "a36xua8a57",
  "64adpyjh7c",
  "fcecvfb9an",
  "67qz4rnzhy",
  "6q5z55fs2p",
  "734b44z8qb",
  "c525phkbab",
  "3kn6qs5kza",
  "fa8az78hvn",
  "brr6vm3a5g",
  "98gqyb923b",
  "cy2f79kqys",
  "8gad8c3z27",
  "amgwfhhqj3",
  "48a9nv5svy",
  "5mumrah8xp",
  "bfta5nj9xb",
  "swhc59yb4b",
  "x9wkwrzunf",
  "aak9r8tn4q",
  "ffb8sh4mfd",
  "nd4h3gfvkj",
  "yx4yc7jyct",
  "eqnk3qcqmr",
  "97sp5brp5h",
  "tbwnzysr99",
  "hwd6dkxn8j",
  "nph73ek9wm",
  "gv4qs4cq7m",
  "63uxw5dyyu",
  "5sz8mraw66",
  "q4fkj8rg9e",
  "s9ppjkqj7m",
  "g47vgnq8tm",
  "vmu8s4x3hp",
  "q2vhfy2k4u",
  "dphfa68655",
  "wcesad3akw",
  "4sd6m3xg9r",
  "j32pgs9gzb",
  "y5d7cw8h9f",
  "x3t5zar743",
  "x8m6pnzvs8",
  "9w2stfep4w",
  "ejtjgr9t66",
  "gq6eej3437",
  "chb3hy2xbe",
  "372u22ef5u",
  "7qnjcz4v7k",
  "y3n3d6dj64",
  "e4xv38m299",
  "8gumhp2qcx",
  "eqjf9qtbj2",
  "wws3gh7s46",
  "87n42qunjn",
  "2k4swaa248",
  "u5tqet28jd",
  "gsnkfsshwp",
  "3yt52z6rk3",
  "y8q876d47e",
  "q7weacbpac",
  "mq4h58mqp8",
  "6w9qsaxh53",
  "vrr394axrc",
  "643qkgs7a2",
  "25yrzaye9d",
  "rzz37kxrgg",
  "rswdb27pdg",
  "ak3shvsqzn",
  "h6unhus2du",
  "xyn6afj5pw",
  "h6zrf487c7",
  "b7844wjzdp",
  "vtgjmxphy3",
  "yqk9tz2zr2",
  "ggbtjed4v4",
  "qb8wbnypn7",
  "zenkyd8r4q",
  "gh4px66apr",
  "7g83xfu52a",
  "g7fdzh7a2n",
  "tqer9trgc6",
  "7qagjdmezg",
  "b78yhpvh97",
  "uaevg6bhxr",
  "4dendpzych",
  "e4rqfjf9ab",
  "e8vd2ur7qk",
  "uddsqhnmsu",
  "zj52hazeb2",
  "vs36v72smm",
  "j2pfh3thjk",
  "j8atjdachu",
  "2cy9buhn9a",
  "2qyqn2qpcp",
  "26hbdqa6a6",
  "4ffg9xmhq4",
  "2k8sd28v6k",
  "a76bfe757j",
  "seymfkj59w",
  "ds5by86u7c",
  "8f77re5rtd",
  "8fkmffa3xc",
  "c72ywea4nb",
  "364h54k3z6",
  "d6bdc4ytvv",
  "d4qvst3qzn",
  "qsu96553z7",
  "f5hkkm5r78",
  "pp4j773j6b",
  "m3v3ertxv2",
  "75gpd2n796",
  "5b9ff7xbsu",
  "khhs643wg2",
  "chhnez9z6k",
  "ygzpd2s5bz",
  "fks3wcvqyn",
  "27t2bd3zy9",
  "xhrrfz8dee",
  "7azzjx7k2r",
  "uq49s8ewpd",
  "ddb6puh567",
  "9cd9pf6tw4",
  "6r5j89u3eg",
  "jyd549ukdz",
  "5rr7xb3s8m",
  "69e57mx6p3",
  "tgsjc5zts6",
  "rtasfeat7s",
  "s7ehd474ck",
  "tgfzzbh26q",
  "vts25h6shq",
  "pv7bmbwbvk",
  "c3k3nn97vu",
  "u2feb29mgs",
  "rdyzsyvay8",
  "vjgmxbhcdv",
  "a4m9r2n2vs",
  "m3mz84f7u7",
  "ekyshw3m6b",
  "kqjuhnmzam",
  "8at7e2xmdz",
  "wqkkw28h4m",
  "vfjknux98w",
  "e4jv43kv28",
  "h4gscszqkf",
  "uy599eqefx",
  "3ky4e7pef8",
  "zj8chbk7ya",
  "2vq93cu5v9",
  "2tyrydyyju",
  "j9zwr5sskb",
  "27w83hdvh5",
  "qt79rd9rp7",
  "xeg2233e8m",
  "rxcs6fxv64",
  "nbwcykw8tq",
  "n5mwqrgg7y",
  "cx5vmrjy9t",
  "d27jvb8n6u",
  "exuj4kcbg6",
  "nqyt6243su",
  "2fpns2bdd5",
  "5ahm8e6577",
  "ruhdb2zb4u",
  "zc9gcuh72w",
  "q5y9zbftd3",
  "kn3a5dkf7w",
  "m8rcscbxxq",
  "zuj7ha2yyz",
  "h8ju7uns4x",
  "3ha2wm73g9",
  "3svs4zr5gq",
  "ervb6uj8vu",
  "rh79zaarp6",
  "6k4ztfph5x",
  "h2czyne4bn",
  "e58sr26ruy",
  "p3qqgh8fz3",
  "96b5xqjj8c",
  "7skx88wxym",
  "m67nyq5fyw",
  "wmwky5jy9z",
  "2z3eueengq",
  "k6k6a84hyf",
  "f7d9g6czj8",
  "7baastt9r2",
  "3jd9tda67j",
  "7a8thqfgen",
  "fmjjtzrwcx",
  "q2synarkjs",
  "uykhczg3c5",
  "wfmw2kw3nb",
  "5jjctp3yhr",
  "m6fwmw7f9m",
  "bp4pcvtxxq",
  "mb37nkhevg",
  "bawy5mbbjq",
  "e327u8yrk7",
  "bhtyps796g",
  "mdaw4rzq3j",
  "7a8vuua3wn",
  "92u26en8xw",
  "srakejkvah",
  "nu7gsggxne",
  "jt3bfgdfz2",
  "2ya96zryxq",
  "jt5458s47p",
  "h8nt3wyrn3",
  "t24axy4ym2",
  "e2d3j5wwvp",
  "mwe5auuujc",
  "cy6tm386bt",
  "nnwwwasgby",
  "ha6zkf37bp",
  "ggcrtg6xb2",
  "73u9msj67x",
  "qpbdfvse9k",
  "9m88scv2w7",
  "n38f2u4cr4",
  "4feveup276",
  "p95fmbd52r",
  "5skc7jxp3u",
  "a6qyegp22p",
  "m9q2nvnuvw",
  "u6gc3mwjtp",
  "fj57a597t8",
  "axmbuat629",
  "y4e4ncvaqb",
  "gumhdjtv9r",
  "c4h3bdswds",
  "n38aybrtrq",
  "9amzumndtm",
  "qbwvyf5yan",
  "uj5hqbpkh5",
  "er9ajrmtfp",
  "ep7dswcfy2",
  "3g5fvebprq",
  "hphxrkmd3s",
  "v8n7u2ut7s",
  "d8zfxmznvt",
  "da6pqpyn6u",
  "9d6czdv9dc",
  "fjfkeg3nnn",
  "c92cpyag7u",
  "rxwrqbn3ys",
  "rddn542uzk",
  "qtfza4yjqf",
  "anbj82w9fv",
  "c8b3khhbaq",
  "z8dwa379dn",
  "3b3vcqy554",
  "4mc8jrkymg",
  "4gw79vbqjf",
  "9nm2utwfav",
  "fh94tn878s",
  "k853nm4ajw",
  "e84acy8pkj",
  "vs92a5fb5w",
  "vee7bgqcqy",
  "j9s29g934p",
  "xc83mzr32y",
  "rwef24bwpn",
  "t66nvewyrq",
  "fdqk3dygng",
  "uz4ptc4c8g",
  "h95vrgyyak",
  "gjuvkvjee9",
  "pr8qe3kq3r",
  "5etcb3krgp",
  "sckb8bb53m",
  "5abdg2kkac",
  "7t258usqk2",
  "yrmvshkkj9",
  "zpsn86jqqp",
  "h67w53sqc9",
  "nvsw6vdd28",
  "x6y79qhmsc",
  "5gjm7rg2jd",
  "fbsg33b47p",
  "sm752mstaa",
  "xe8m7k7mww",
  "c3eru9urq3",
  "t8prn9etdp",
  "9sybfe3qwr",
  "wn6zp74dq6",
  "7p4ac8x6rc",
  "24229ak4ah",
  "nakbr8qxhc",
  "6d7psqd2r5",
  "7b8muqemjn",
  "6j4eh4zupb",
  "r3wj8mympe",
  "7cct7d4q8q",
  "vkfjfd9ubk",
  "nw5r53qy88",
  "qx7psmmpya",
  "y44vpatqmp",
  "5udsvz66pw",
  "j7uvpv6bkt",
  "y9s4fqrx3d",
  "j4stwacb47",
  "sd746m9syy",
  "9uknk8usrs",
  "wr29dmh4h9",
  "6ztvm72f3y",
  "6xt64dbcjc",
  "2j2du44w44",
  "8ppfcrbt5c",
  "rmxnhwskfu",
  "7k58868djq",
  "5h3fbg5bca",
  "fuudxqsnws",
  "9sxc5uadtz",
  "6cr9qt7j96",
  "yxzpz475c6",
  "sa5ydg47uu",
  "a8y7zdeukn",
  "mqay92y46k",
  "6yf3tr438h",
  "gbuugzfrub",
  "bkwb947dwn",
  "mhdpvkfcxt",
  "5dexf4bvsy",
  "ncy2tk74ut",
  "z3vd5ht57e",
  "mksmxaqehg",
  "kx7mfv7qb7",
  "v52ktx9sr8",
  "jgzych2qbt",
  "w8k2g4ajwf",
  "qctg42m2xe",
  "p9t4wk7uzh",
  "bnrpza2v2m",
  "sqr5mzhu68",
  "3p3wjzyxhe",
  "67cz6suef4",
  "t8kejrc4qr",
  "hhrfcz69nf",
  "8dqzbuv73f",
  "yjgbp65khv",
  "bsx5s42ag8",
  "8zm2m2t36w",
  "q6rb2wv2tf",
  "dennphzege",
  "zf5vwqyktb",
  "b9tj4m7883",
  "kj8qdxvhrq",
  "eypq3mawhy",
  "asw6q2a63k",
  "gthbpt7nv8",
  "vec465bhce",
  "pfmv76fauz",
  "vgbffgt6h4",
  "b9vat4krpj",
  "sprktb9jzt",
  "kbprwt57cd",
  "t2afmnunmu",
  "u94y438w4z",
  "v2cqjh46k7",
  "c58rq2tsgh",
  "kr63yhmtqx",
  "7uc7zgxneu",
  "7d97gkdnpu",
  "2r2uv56yzx",
  "3qbktphmgk",
  "kmpvntw255",
  "rzxsr3f9xr",
  "4vzbxaqtwt",
  "ugx6czxydp",
  "5c6j9877kt",
  "2buvfnspyj",
  "w8e5pep7bk",
  "ykzay6wte3",
  "d6ta8yv8rw",
  "npyyfywz73",
  "v6kx9by45m",
  "nm2wb3gxap",
  "85ppsn7y59",
  "sj7852t8ck",
  "qurfmrqnd7",
  "r44m7werkb",
  "ufe4w9kf86",
  "td4g44c8cv",
  "evy2cpf8rt",
  "cx5aax79dy",
  "5s2h3b5sg4",
  "n4sxer9vkf",
  "8t8b7nxwhw",
  "9vfm3yat3k",
  "e6t9hvqs5f",
  "ukr9tyakvp",
  "5smw9b64vh",
  "ft2mw4vxyt",
  "utusnzqhqe",
  "2ckpb4ktmu",
  "4rjbmnjcw9",
  "7yaukf2yj6",
  "w649tqpkmf",
  "x8njus6c9d",
  "b46hsm7t62",
  "5q67umu9vn",
  "fut4ycvufq",
  "u7wx574v9f",
  "bt629mp7yy",
  "2q9va5vg5x",
  "8p9hrebss8",
  "yehwvn9mab",
  "byn3va46my",
  "g9fxp45xsr",
  "gbgexvj5yk",
  "k577c7yk99",
  "v72cyjpbg3",
  "ykt5m5zk23",
  "zfatzw5vv5",
  "yj6fmdmmmh",
  "zx5z3e2cqk",
  "qczswz74wv",
  "wbc7squ2ng",
  "5bwv25cn9w",
  "ck4bxnwq9j",
  "4vcv5fqvsq",
  "6z6jum7mvx",
  "yy8bjrfmy8",
  "h9d96nynes",
  "5yc5czpnuu",
  "8mk3gu3c6h",
  "4b67yj5a8t",
  "b2w6933h9b",
  "dpnkfmux8h",
  "tmq2mrr3mw",
  "rp94pkc4cq",
  "pw8wdkr6ke",
  "sggqjaqe36",
  "jwqwgamkbs",
  "x9svk8q8pn",
  "zzz2mzg3rd",
  "e3n8hur6sg",
  "kuq4gfcz8y",
  "47e4majsda",
  "pysb3nqkfm",
  "xmbyqtqyx2",
  "atnevyfdtf",
  "fg42jdp8yq",
  "ccebfc2jv5",
  "4rqgkmgdnt",
  "zf8nrcv3nj",
  "dpw25bqrnc",
  "m8t9w3nrba",
  "jxnepb3v5u",
  "a5eyrw3ppy",
  "s686w258pq",
  "e4mepgwen3",
  "vbbnhzhgzq",
  "3s6wwr6jn4",
  "vjbpwccsjq",
  "z6buevp957",
  "y6zhmjcpm8",
  "2hyzxdhmp3",
  "58k39nqs2u",
  "q4nnr4y4m5",
  "n8fb7mzasa",
  "daqf55w2gf",
  "s52t2ng9wj",
  "g25xq9bktq",
  "xsvjsc82q7",
  "p33ub5raqd",
  "wkmg2g3x7b",
  "qb8xks3gzj",
  "szad9e2sxp",
  "5mkrbfjams",
  "caa3sm3egp",
  "9ph6gyude7",
  "3csvq3qqnd",
  "2c6j7bxntg",
  "tznqc5sww7",
  "sm87uhq47n",
  "67p6a2hxwb",
  "wxy7389xk6",
  "6c696zvh4b",
  "6fjqghk3rm",
  "pztexdqs3d",
  "yettg8y3zm",
  "r9dv8e664u",
  "ebqvjsfmdc",
  "q2nreqsd75",
  "96s9z49mec",
  "gz5a57k7uk",
  "74h4ptqm5k",
  "x6tgthb56s",
  "g356m7rbjy",
  "ac9j2wgp9t",
  "u6fdcrhvwk",
  "3kdwe5nwj8",
  "57enxaya44",
  "yz488ycc2r",
  "nky8t5xmdb",
  "bdcwvtzwht",
  "pfrwhtatba",
  "vcyk6d955h",
  "6yepxktd9r",
  "k4ua6t7fdq",
  "w64kn8xdea",
  "8yqkgay8ed",
  "33tt8pg5at",
  "tbewgmuv4k",
  "bbn566qvsv",
  "qj7fr9m8dw",
  "j7mtcqm5ed",
  "p6w78ev8y4",
  "ss2ankv453",
  "6b2h4fbq3k",
  "z56rxj2q7d",
  "rr3zfy5jna",
  "h4wdcaae8m",
  "jh888wvyfv",
  "7w42zqat83",
  "3cu4a4e9aj",
  "myc9rn883b",
  "h7ua5w697f",
  "5r25cr2fw4",
  "hnqrbg3g69",
  "5env2g5g2d",
  "b772vxch9q",
  "wtb5x8vd3y",
  "63y3523ry5",
  "vtz3ypytcb",
  "5gtyq5vtud",
  "equesu4p28",
  "dg884np8g4",
  "75kd6j3nwt",
  "jf9z72u33e",
  "cr4un6qqhn",
  "gugnvvd666",
  "csecq7ssu6",
  "658jxsqx29",
  "xrkgn575qz",
  "kypfqttfb2",
  "6jkjr547hz",
  "yfsvq8r5gn",
  "5dy45umgdr",
  "ywc9xbu3z8",
  "saur3rqjat",
  "k5zbm4xtv2",
  "zk7nudc8v4",
  "dfewuqsb7m",
  "8g76dnacbj",
  "8xzsj97qcj",
  "qmmmzz7p29",
  "43fu5wtcef",
  "p6pkcm6xkj",
  "h6pmyhftet",
  "mmaf53a967",
  "3hadgyfe7e",
  "42247frh59",
  "rn9ejxqqxg",
  "4kr5w9a2t8",
  "fkha4utcq5",
  "mn475rbyyt",
  "6ua3x9p93m",
  "yk2v89mbfm",
  "3nztert7rd",
  "jrpds5myqh",
  "s92sdh9ud6",
  "qcpga28q4s",
  "kv7vuc7q49",
  "h7mtzkx4bz",
  "m56h2uyy57",
  "63754m9xj6",
  "9zuw8t6rp7",
  "2r6pumfc6e",
  "axqr49372x",
  "xk286dt6rh",
  "ydgxm4fv8q",
  "gf82vwdwv2",
  "v85vpxzhhd",
  "gj9fcmhejq",
  "cvf4f5dcaz",
  "wkuff89vzk",
  "a5gy9rpez5",
  "krsvpc33sy",
  "cu4n89n8jc",
  "dqt8mce8n3",
  "vpbmfqt89h",
  "gup3j2vfe8",
  "4e7jsh5hg4",
  "rnqb6ktw95",
  "exm9kgtqcg",
  "vte4dzvxd7",
  "vrms7ufz38",
  "a6h9w2hes5",
  "5jtkyzdaey",
  "t39xfyfgnr",
  "cfhzpfaabj",
  "7e78exmsf9",
  "uhm9285dxz",
  "6aqf679uz2",
  "y2hmzkyg7y",
  "2deujk2wbk",
  "fpwdde2vaj",
  "fk89wt48d7",
  "68ap259rdz",
  "53u9xre8uw",
  "h4u9b9a564",
  "65fuuqs9s2",
  "633zufkcgb",
  "69rg4wajnf",
  "6ut7txgwkj",
  "46k7p2cgn2",
  "r98e8rc822",
  "rr7uswdkpz",
  "gmpnkmz7qe",
  "88buxrgrs9",
  "x9yjqeu9sk",
  "8s3vp9mk9e",
  "c8vw7xagak",
  "fmmhxwtumw",
  "e3t6yf6e43",
  "kae98h8jx5",
  "upqsvkn73p",
  "8qkrc8zgx8",
  "u5ze92ffx7",
  "tykrxt6dz2",
  "zm5ugg6wv4",
  "hhn9bw95ee",
  "uh8cbewzpa",
  "akru5yguew",
  "zb3s3m5w6s",
  "a62hj3wa9z",
  "pk7hfnsy98",
  "7pg9q3pd4v",
  "ghna92cmct",
  "yydfxjncdx",
  "3ycdjrdrje",
  "ecrw377365",
  "63ygss3qvt",
  "6af5xcj72x",
  "us9vn75sba",
  "sdr8xejduh",
  "tett26kp53",
  "jp6qkyjbdc",
  "c97236qh78",
  "788rvzeyc6",
  "f4h3n9ycze",
  "arc57nfcnx",
  "2nswq92xxe",
  "jdy3w242xv",
  "8kenh42aye",
  "qpcqztj92h",
  "r4cx4a2y4e",
  "xx2s4a6dfx",
  "8dexkg5d9s",
  "bxks6zk3mn",
  "4nbvuy5g87",
  "kuuxjutdcg",
  "dtdszxnh2j",
  "kyjx7azsqv",
  "u4gsteec8y",
  "h3uefscbsx",
  "mgms73bnvs",
  "qsfeefhemu",
  "f96va7dq9n",
  "8224xsu6g9",
  "pqe8fty6xn",
  "b6vndf4hqt",
  "ddgqt6ae4f",
  "jz7wg2extp",
  "76jt5tqs8c",
  "nspz398p7v",
  "y6bmwsfnfp",
  "z44shjnqcn",
  "3g9t7q4j6t",
  "m27z9xuyw3",
  "zc8sne5k9y",
  "atsq444rbk",
  "jcgmmqc7ch",
  "ghbzzj5w5r",
  "v42juz6uft",
  "d3v2cp2crq",
  "bpsx7e3ff4",
  "5ca6frfvm8",
  "p3xbp6mb7d",
  "5u6gt3364z",
  "pgebr5ykgk",
  "b8f8tr3meh",
  "g8gc8dhugy",
  "z7596vk98u",
  "efa8nt9cq7",
  "exqqnrb3g8",
  "df6b82gwfh",
  "9xd9e9m8pe",
  "57c672hj4p",
  "j4hh77xune",
  "szdpuprv53",
  "9e6mdtt2dk",
  "h463rh6mdw",
  "rvtcwxpmk6",
  "9p2vvhgsv6",
  "wx8hvcje9p",
  "89j7n2cspa",
  "v3tq9kcsxk",
  "hbre4apbdt",
  "skz2suv2e3",
  "6uw9pj9r52",
  "vxs9tpkqr4",
  "ae5xcgn8s5",
  "z4hfwzmgza",
  "n4ae8k3gb2",
  "yhfy3eeh84",
  "baapa9vbwv",
  "td9hf3w6rf",
  "emdcexzemg",
  "2gn4eszr97",
  "bcwze4hpdd",
  "rv7wjb6fvn",
  "a72txpkj9x",
  "dydrrnqbx5",
  "v6x2p7xwpt",
  "3gzcb3cae7",
  "gw644rfcks",
  "zcppqyxezu",
  "zqwwk8n5wf",
  "mnpsjgs4u6",
  "dygjyyqukz",
  "88gg3c3a8u",
  "5y3p7suc4x",
  "qrssrvyqma",
  "fvstrxymgy",
  "2xrw37kybp",
  "fupmtpmgx5",
  "myc2n6ebwf",
  "tp5wj7ddak",
  "vnbjmydkgk",
  "e9psv7ysmz",
  "892b6x5rv9",
  "p5gmtk7u9g",
  "sn8yf65cav",
  "bsk67g8v98",
  "mrfrdfx3em",
  "spgrhjdyst",
  "85h7m5m4ts",
  "9m3h25e6az",
  "w5p2288gax",
  "txmgterg36",
  "8sd6k4kcav",
  "5fh6747e6j",
  "nce5yfq94g",
  "qpgzqbhkyh",
  "yxxc9pmpfy",
  "3b2fn85fkx",
  "qku7wxjxv5",
  "me7k7524sz",
  "cqfapq722x",
  "2ena2t3ahm",
  "e3nxf9eqb4",
  "qxe4y8eb38",
  "js63n3cjut",
  "659qd4agzg",
  "csz8aassjp",
  "tdxfepux3h",
  "patecxem28",
  "c7s7ap8zbv",
  "baz8fqd3br",
  "bg4f9vn9pz",
  "57gj445hn2",
  "w39hb49d3r",
  "uv473s9eqx",
  "8n9be5vrea",
  "6v5v3cfwqk",
  "pzkmrtnd6g",
  "3e75q9mrh5",
  "4yrwcyqmaq",
  "kube77h7hv"
];


// Automatic Device Language Detection & Live Translation Engine
// Detects the phone's default language (navigator.language) and translates UI strings automatically.

const BASE_EN = {
  newItemPlaceholder: "Add item...",
  newListTitle: "New list",
  listNamePlaceholder: "List name...",
  itemCategoryPlaceholder: "Section (optional)...",
  allLists: "All",
  uncategorized: "General",
  // Default List Categories (Locations/Types)
  catPantry: "Pantry",
  catKitchen: "Kitchen",
  catBathroom: "Bathroom",
  catMarket: "Market",
  catHome: "Home",
  // Default In-List Sections (Item Groups)
  secGeneral: "General",
  secProduce: "Produce",
  secDairy: "Dairy",
  secMeat: "Meat & Fish",
  secBakery: "Bakery",
  secPantry: "Dry Goods",
  secCleaning: "Cleaning",
  secPersonal: "Personal Care",
  // Customization & Actions
  appearance: "Style",
  colorTheme: "Color",
  fontStyle: "Font",
  listCategory: "Category",
  deleteList: "Delete list",
  clearChecked: "Clear checked",
  createList: "Create",
  save: "Done",
  cancel: "Cancel",
  limitReached: "1,000 item limit reached",
  emptyNoteHint: "Tap above to add your first item",
  autoDeleteInfo: "Crossed-out item is deleted within 3 days.",
  autoDeleteRemaining: "Time remaining: {d} days {h} hours",
  inactiveTagTitle: "This NFC tag is paused",
  inactiveTagDesc: "Please contact the administrator to activate this link.",
  invalidTagTitle: "Invalid NFC link",
  invalidTagDesc: "Please scan a valid ThingsYouNeed NFC tag.",
  customSectionPrompt: "New section name:"
};

const BUILTIN_DICTIONARIES = {
  en: BASE_EN,
  tr: {
    newItemPlaceholder: "Ürün ekle...",
    newListTitle: "Yeni liste",
    listNamePlaceholder: "Liste adı...",
    itemCategoryPlaceholder: "Bölüm (isteğe bağlı)...",
    allLists: "Tümü",
    uncategorized: "Genel",
    catPantry: "Kiler",
    catKitchen: "Mutfak",
    catBathroom: "Banyo",
    catMarket: "Market",
    catHome: "Ev",
    secGeneral: "Genel",
    secProduce: "Meyve & Sebze",
    secDairy: "Süt Ürünleri",
    secMeat: "Et & Şarküteri",
    secBakery: "Fırın",
    secPantry: "Bakliyat",
    secCleaning: "Temizlik",
    secPersonal: "Kişisel Bakım",
    appearance: "Görünüm",
    colorTheme: "Renk",
    fontStyle: "Yazı Tipi",
    listCategory: "Kategori",
    deleteList: "Listeyi sil",
    clearChecked: "Çizilenleri temizle",
    createList: "Oluştur",
    save: "Tamam",
    cancel: "İptal",
    limitReached: "1.000 ürün sınırına ulaşıldı",
    emptyNoteHint: "İlk ürünü eklemek için yukarıya dokunun",
    autoDeleteInfo: "Üzeri çizilen madde 3 gün içinde silinir.",
    autoDeleteRemaining: "Silinmesine kalan süre: {d} gün {h} saat",
    inactiveTagTitle: "Bu NFC etiketi pasif durumda",
    inactiveTagDesc: "Etiketi aktifleştirmek için yönetici ile iletişime geçin.",
    invalidTagTitle: "Geçersiz NFC bağlantısı",
    invalidTagDesc: "Lütfen geçerli bir NFC etiketi okutun.",
    customSectionPrompt: "Yeni bölüm adı:"
  },
  de: {
    newItemPlaceholder: "Artikel hinzufügen...",
    newListTitle: "Neue Liste",
    listNamePlaceholder: "Listenname...",
    itemCategoryPlaceholder: "Bereich (optional)...",
    allLists: "Alle",
    uncategorized: "Allgemein",
    catPantry: "Vorratskammer",
    catKitchen: "Küche",
    catBathroom: "Badezimmer",
    catMarket: "Supermarkt",
    catHome: "Zuhause",
    secGeneral: "Allgemein",
    secProduce: "Obst & Gemüse",
    secDairy: "Milchprodukte",
    secMeat: "Fleisch & Fisch",
    secBakery: "Bäckerei",
    secPantry: "Vorräte",
    secCleaning: "Reinigung",
    secPersonal: "Körperpflege",
    appearance: "Stil",
    colorTheme: "Farbe",
    fontStyle: "Schriftart",
    listCategory: "Kategorie",
    deleteList: "Liste löschen",
    clearChecked: "Erledigte löschen",
    createList: "Erstellen",
    save: "Fertig",
    cancel: "Abbrechen",
    limitReached: "Limit von 1.000 Artikeln erreicht",
    emptyNoteHint: "Oben tippen, um den ersten Artikel hinzuzufügen",
    autoDeleteInfo: "Durchgestrichene Artikel werden in 3 Tagen gelöscht.",
    autoDeleteRemaining: "Verbleibende Zeit: {d} Tage {h} Std.",
    inactiveTagTitle: "Dieser NFC-Tag ist pausiert",
    inactiveTagDesc: "Bitte wenden Sie sich an den Administrator.",
    invalidTagTitle: "Ungültiger NFC-Link",
    invalidTagDesc: "Bitte scannen Sie einen gültigen NFC-Tag.",
    customSectionPrompt: "Neuer Bereichsname:"
  },
  fr: {
    newItemPlaceholder: "Ajouter un article...",
    newListTitle: "Nouvelle liste",
    listNamePlaceholder: "Nom de la liste...",
    itemCategoryPlaceholder: "Rayon (optionnel)...",
    allLists: "Tout",
    uncategorized: "Général",
    catPantry: "Garde-manger",
    catKitchen: "Cuisine",
    catBathroom: "Salle de bain",
    catMarket: "Courses",
    catHome: "Maison",
    secGeneral: "Général",
    secProduce: "Fruits & Légumes",
    secDairy: "Produits laitiers",
    secMeat: "Viande & Poisson",
    secBakery: "Boulangerie",
    secPantry: "Épicerie",
    secCleaning: "Entretien",
    secPersonal: "Hygiène",
    appearance: "Style",
    colorTheme: "Couleur",
    fontStyle: "Police",
    listCategory: "Catégorie",
    deleteList: "Supprimer la liste",
    clearChecked: "Effacer cochés",
    createList: "Créer",
    save: "OK",
    cancel: "Annuler",
    limitReached: "Limite de 1 000 articles atteinte",
    emptyNoteHint: "Appuyez ci-dessus pour ajouter un article",
    autoDeleteInfo: "L'article barré sera supprimé sous 3 jours.",
    autoDeleteRemaining: "Temps restant : {d} j {h} h",
    inactiveTagTitle: "Ce tag NFC est désactivé",
    inactiveTagDesc: "Veuillez contacter l'administrateur.",
    invalidTagTitle: "Lien NFC invalide",
    invalidTagDesc: "Veuillez scanner un tag NFC valide.",
    customSectionPrompt: "Nom du nouveau rayon :"
  },
  es: {
    newItemPlaceholder: "Añadir artículo...",
    newListTitle: "Nueva lista",
    listNamePlaceholder: "Nombre de la lista...",
    itemCategoryPlaceholder: "Sección (opcional)...",
    allLists: "Todo",
    uncategorized: "General",
    catPantry: "Despensa",
    catKitchen: "Cocina",
    catBathroom: "Baño",
    catMarket: "Mercado",
    catHome: "Hogar",
    secGeneral: "General",
    secProduce: "Frutas y Verduras",
    secDairy: "Lácteos",
    secMeat: "Carne y Pescado",
    secBakery: "Panadería",
    secPantry: "Despensa",
    secCleaning: "Limpieza",
    secPersonal: "Cuidado personal",
    appearance: "Estilo",
    colorTheme: "Color",
    fontStyle: "Fuente",
    listCategory: "Categoría",
    deleteList: "Eliminar lista",
    clearChecked: "Borrar marcados",
    createList: "Crear",
    save: "Listo",
    cancel: "Cancelar",
    limitReached: "Límite de 1.000 artículos alcanzado",
    emptyNoteHint: "Toca arriba para añadir tu primer artículo",
    autoDeleteInfo: "El artículo tachado se eliminará en 3 días.",
    autoDeleteRemaining: "Tiempo restante: {d} días {h} horas",
    inactiveTagTitle: "Esta etiqueta NFC está pausada",
    inactiveTagDesc: "Contacta con el administrador para activarla.",
    invalidTagTitle: "Enlace NFC no válido",
    invalidTagDesc: "Escanea una etiqueta NFC válida.",
    customSectionPrompt: "Nombre de la sección:"
  },
  ar: {
    newItemPlaceholder: "إضافة عنصر...",
    newListTitle: "قائمة جديدة",
    listNamePlaceholder: "اسم القائمة...",
    itemCategoryPlaceholder: "القسم (اختياري)...",
    allLists: "الكل",
    uncategorized: "عام",
    catPantry: "المؤن",
    catKitchen: "المطبخ",
    catBathroom: "الحمام",
    catMarket: "السوق",
    catHome: "المنزل",
    secGeneral: "عام",
    secProduce: "خضروات وفواكه",
    secDairy: "ألبان",
    secMeat: "لحوم",
    secBakery: "مخبوزات",
    secPantry: "بقوليات",
    secCleaning: "تنظيف",
    secPersonal: "عناية شخصية",
    appearance: "المظهر",
    colorTheme: "اللون",
    fontStyle: "الخط",
    listCategory: "الفئة",
    deleteList: "حذف القائمة",
    clearChecked: "مسح المحدد",
    createList: "إنشاء",
    save: "تم",
    cancel: "إلغاء",
    limitReached: "تم الوصول للحد الأقصى (1000)",
    emptyNoteHint: "اضغط بالأعلى لإضافة أول عنصر",
    autoDeleteInfo: "يتم حذف العنصر المشطوب خلال 3 أيام.",
    autoDeleteRemaining: "الوقت المتبقي: {d} يوم و {h} ساعة",
    inactiveTagTitle: "ملصق NFC غير نشط",
    inactiveTagDesc: "يرجى التواصل مع المسؤول لتفعيله.",
    invalidTagTitle: "رابط غير صالح",
    invalidTagDesc: "يرجى مسح ملصق NFC صالح.",
    customSectionPrompt: "اسم القسم الجديد:"
  }
};

let activeDict = { ...BASE_EN };
let detectedLangCode = 'en';
function getDeviceLanguageCode() {
  const raw = (navigator.languages && navigator.languages[0]) || navigator.language || 'en';
  return raw.split('-')[0].toLowerCase();
}
async function initI18n(overrideLang = null) {
  detectedLangCode = overrideLang || getDeviceLanguageCode();

  // Set RTL direction for Arabic/Hebrew/Persian/Urdu
  if (['ar', 'he', 'fa', 'ur'].includes(detectedLangCode)) {
    document.documentElement.dir = 'rtl';
  } else {
    document.documentElement.dir = 'ltr';
  }
  document.documentElement.lang = detectedLangCode;

  // 1. Check built-in dictionary first
  if (BUILTIN_DICTIONARIES[detectedLangCode]) {
    activeDict = { ...BASE_EN, ...BUILTIN_DICTIONARIES[detectedLangCode] };
    return activeDict;
  }

  // 2. Check cached live translation in localStorage
  const cacheKey = `tyn_i18n_cache_${detectedLangCode}`;
  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      activeDict = { ...BASE_EN, ...JSON.parse(cached) };
      return activeDict;
    }
  } catch (_) {}

  // 3. Fetch live translation from Google Translate / MyMemory API for any other phone language
  try {
    const keys = Object.keys(BASE_EN);
    const values = keys.map(k => BASE_EN[k]);
    const joined = values.join(' ||| ');
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${encodeURIComponent(detectedLangCode)}&dt=t&q=${encodeURIComponent(joined)}`;

    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && Array.isArray(data[0])) {
        const translatedFull = data[0].map(part => part[0]).join('');
        const splitValues = translatedFull.split(/\s*\|\|\|\s*/);
        const translatedObj = {};
        keys.forEach((k, idx) => {
          translatedObj[k] = splitValues[idx] || BASE_EN[k];
        });
        activeDict = { ...BASE_EN, ...translatedObj };
        localStorage.setItem(cacheKey, JSON.stringify(translatedObj));
      }
    }
  } catch (err) {
    // Fallback to English if offline or blocked
    activeDict = { ...BASE_EN };
  }

  return activeDict;
}
function t(key, params = {}) {
  let str = activeDict[key] || BASE_EN[key] || key;
  Object.keys(params).forEach(k => {
    str = str.replace(`{${k}}`, params[k]);
  });
  return str;
}
function getActiveLang() {
  return detectedLangCode;
}


const MAX_ITEMS_PER_USER = 1000;
const THREE_DAYS_MS = 3 * 24 * 60 * 60 * 1000; // 72 hours in ms

const META_STORAGE_KEY = 'tyn_admin_accounts_meta_v1';
const VAULT_PREFIX = 'tyn_encrypted_vault_v1_';
const CLOUD_CONFIG_KEY = 'tyn_supabase_config_v1';

const syncChannel = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel('tyn_nfc_sync') : null;

// Curated minimalist color palettes scoped per individual list
const LIST_THEMES = [
  { id: 'paper', name: 'Warm Paper', bg: '#FFFDF9', card: '#F5F2EB', text: '#1C1B18', accent: '#2E2B25', border: '#E5DFD3' },
  { id: 'sage', name: 'Sage Mist', bg: '#EDF5F0', card: '#E2EFE6', text: '#16261A', accent: '#2A5C3B', border: '#C8DFD0' },
  { id: 'sand', name: 'Soft Sand', bg: '#F8F0E3', card: '#EFE4D2', text: '#2B2116', accent: '#8A5A2B', border: '#DFCGB5' .replace('G', 'C') },
  { id: 'sky', name: 'Ocean Air', bg: '#ECF4FA', card: '#DFECF6', text: '#142230', accent: '#235B8C', border: '#C5D9EC' },
  { id: 'lavender', name: 'Lavender', bg: '#F3EFFA', card: '#E8E0F5', text: '#22192E', accent: '#5D3A8C', border: '#D5C7EB' },
  { id: 'rose', name: 'Blush Clay', bg: '#FAEEEE', card: '#F3E1E1', text: '#2E1818', accent: '#8F3939', border: '#E6CACA' },
  { id: 'lemon', name: 'Soft Citrus', bg: '#FBF8E4', card: '#F3EECC', text: '#282411', accent: '#7D6B14', border: '#E4DCAC' },
  { id: 'slate', name: 'Minimal Dark', bg: '#181A20', card: '#22252D', text: '#F3F4F6', accent: '#E5E7EB', border: '#323642', dark: true }
];

// Curated font styles for lists
const LIST_FONTS = [
  { id: 'sans', name: 'Clean Sans', family: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" },
  { id: 'serif', name: 'Editorial', family: "'Newsreader', 'Georgia', serif" },
  { id: 'hand', name: 'Handwritten', family: "'Caveat', cursive", scale: '1.18rem' },
  { id: 'mono', name: 'Mono Note', family: "'JetBrains Mono', monospace", scale: '0.94rem' },
  { id: 'rounded', name: 'Soft Round', family: "'Plus Jakarta Sans', sans-serif" }
];

// Web Crypto helper: SHA-256 hash of token so vault storage key doesn't even expose raw token
async function sha256Hex(text) {
  const data = new TextEncoder().encode(text + '_tyn_vault_salt_2026');
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}

// Web Crypto helper: Derive AES-GCM key from the user's NFC token
async function deriveVaultKey(token) {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    enc.encode(token.padEnd(32, '#')),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  );
  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: enc.encode('thingsyourneed-zero-knowledge-salt'),
      iterations: 1000,
      hash: 'SHA-256'
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

async function encryptPayload(token, obj) {
  try {
    const key = await deriveVaultKey(token);
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encoded = new TextEncoder().encode(JSON.stringify(obj));
    const cipherBuf = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, encoded);
    const combined = new Uint8Array(iv.length + cipherBuf.byteLength);
    combined.set(iv, 0);
    combined.set(new Uint8Array(cipherBuf), iv.length);
    let binary = '';
    combined.forEach(b => { binary += String.fromCharCode(b); });
    return btoa(binary);
  } catch (_) {
    return btoa(unescape(encodeURIComponent(JSON.stringify(obj))));
  }
}

async function decryptPayload(token, cipherBase64) {
  try {
    const binary = atob(cipherBase64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    const iv = bytes.slice(0, 12);
    const data = bytes.slice(12);
    const key = await deriveVaultKey(token);
    const plainBuf = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, data);
    return JSON.parse(new TextDecoder().decode(plainBuf));
  } catch (_) {
    try {
      return JSON.parse(decodeURIComponent(escape(atob(cipherBase64))));
    } catch (e) {
      return null;
    }
  }
}

// Cloud Config (Supports BOTH Firebase Realtime Database & Supabase REST API)
const DEFAULT_FIREBASE_DB_URL = ''; // Paste Firebase Realtime DB URL here for global sync
function getCloudConfig() {
  try {
    const raw = localStorage.getItem(CLOUD_CONFIG_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.url) return parsed;
    }
  } catch (_) {}
  if (DEFAULT_FIREBASE_DB_URL) {
    return { url: DEFAULT_FIREBASE_DB_URL.replace(/\/+$/, ''), anonKey: '', enabled: true, provider: 'firebase' };
  }
  return { url: '', anonKey: '', enabled: false, provider: 'firebase' };
}
function saveCloudConfig(url, anonKey = '', enabled = true) {
  const cleanUrl = (url || '').trim().replace(/\/+$/, '');
  const cleanKey = (anonKey || '').trim();
  const isFirebase = cleanUrl.includes('firebaseio.com') || cleanUrl.includes('firebasedatabase.app') || !cleanKey;
  const cfg = {
    url: cleanUrl,
    anonKey: cleanKey,
    provider: isFirebase ? 'firebase' : 'supabase',
    enabled: Boolean(cleanUrl && enabled)
  };
  localStorage.setItem(CLOUD_CONFIG_KEY, JSON.stringify(cfg));
  return cfg;
}

function isFirebaseConfig(cfg) {
  return cfg && cfg.enabled && cfg.url && (cfg.provider === 'firebase' || cfg.url.includes('firebaseio.com') || cfg.url.includes('firebasedatabase.app'));
}

async function firebaseFetch(path, options = {}) {
  const cfg = getCloudConfig();
  if (!isFirebaseConfig(cfg)) return null;
  try {
    const authParam = cfg.anonKey ? `?auth=${encodeURIComponent(cfg.anonKey)}` : '';
    const res = await fetch(`${cfg.url}/${path}.json${authParam}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      }
    });
    if (!res.ok) return null;
    const text = await res.text();
    return text ? JSON.parse(text) : null;
  } catch (_) {
    return null;
  }
}

async function supabaseFetch(path, options = {}) {
  const cfg = getCloudConfig();
  if (!cfg.enabled || !cfg.url || isFirebaseConfig(cfg) || !cfg.anonKey) return null;
  try {
    const res = await fetch(`${cfg.url}/rest/v1/${path}`, {
      ...options,
      headers: {
        'apikey': cfg.anonKey,
        'Authorization': `Bearer ${cfg.anonKey}`,
        'Content-Type': 'application/json',
        ...(options.headers || {})
      }
    });
    if (!res.ok) return null;
    const text = await res.text();
    return text ? JSON.parse(text) : [];
  } catch (_) {
    return null;
  }
}

// Load or initialize the 1,000 account metadata slots (Contains ZERO user list content)
function getAllAccountsMetadataLocal() {
  try {
    const raw = localStorage.getItem(META_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length === 1000) {
        return parsed;
      }
    }
  } catch (_) {}

  const initial = INITIAL_TOKENS.map((token, idx) => ({
    slot: idx + 1,
    token,
    status: 'active', // 'active' | 'passive'
    adminNote: '',
    lastAccessedAt: null,
    itemCount: 0,
    listCount: 0,
    resetVersion: 1
  }));
  localStorage.setItem(META_STORAGE_KEY, JSON.stringify(initial));
  return initial;
}

function saveAccountsMetadataLocal(accounts) {
  localStorage.setItem(META_STORAGE_KEY, JSON.stringify(accounts));
  if (syncChannel) syncChannel.postMessage({ type: 'meta_updated' });
}
async function getAllAccountsForAdmin() {
  const local = getAllAccountsMetadataLocal();
  const cfg = getCloudConfig();
  if (cfg.enabled) {
    if (isFirebaseConfig(cfg)) {
      const remoteObj = await firebaseFetch('nfc_accounts');
      if (remoteObj && typeof remoteObj === 'object') {
        const merged = local.map(item => {
          const r = remoteObj[`slot_${item.slot}`] || remoteObj[item.slot];
          if (!r) return item;
          return {
            slot: item.slot,
            token: item.token,
            status: r.status || item.status,
            adminNote: r.admin_note ?? r.adminNote ?? item.adminNote,
            lastAccessedAt: r.last_accessed_at || r.lastAccessedAt || item.lastAccessedAt,
            itemCount: r.item_count ?? r.itemCount ?? item.itemCount,
            listCount: r.list_count ?? r.listCount ?? item.listCount,
            resetVersion: r.reset_version ?? r.resetVersion ?? item.resetVersion
          };
        });
        saveAccountsMetadataLocal(merged);
        return merged;
      }
    } else {
      const remote = await supabaseFetch('nfc_accounts?select=*&order=slot.asc');
      if (Array.isArray(remote) && remote.length > 0) {
        const remoteMap = new Map(remote.map(r => [r.slot, r]));
        const merged = local.map(item => {
          const r = remoteMap.get(item.slot);
          if (!r) return item;
          return {
            slot: item.slot,
            token: item.token,
            status: r.status || item.status,
            adminNote: r.admin_note ?? item.adminNote,
            lastAccessedAt: r.last_accessed_at || item.lastAccessedAt,
            itemCount: r.item_count ?? item.itemCount,
            listCount: r.list_count ?? item.listCount,
            resetVersion: r.reset_version ?? item.resetVersion
          };
        });
        saveAccountsMetadataLocal(merged);
        return merged;
      }
    }
  }
  return local;
}
function findAccountByToken(token) {
  if (!token) return null;
  const clean = token.trim().toLowerCase();
  const accounts = getAllAccountsMetadataLocal();
  return accounts.find(a => a.token === clean) || null;
}

// Admin Actions (Never touches or reads user list contents!)
async function updateAccountAdminFields(slot, updates) {
  const accounts = getAllAccountsMetadataLocal();
  const idx = accounts.findIndex(a => a.slot === Number(slot));
  if (idx === -1) return null;

  accounts[idx] = { ...accounts[idx], ...updates };
  saveAccountsMetadataLocal(accounts);

  const acc = accounts[idx];
  const payload = {
    slot: acc.slot,
    token: acc.token,
    status: acc.status,
    admin_note: acc.adminNote,
    last_accessed_at: acc.lastAccessedAt,
    item_count: acc.itemCount,
    list_count: acc.listCount,
    reset_version: acc.resetVersion,
    updated_at: new Date().toISOString()
  };

  const cfg = getCloudConfig();
  if (isFirebaseConfig(cfg)) {
    await firebaseFetch(`nfc_accounts/slot_${acc.slot}`, {
      method: 'PUT',
      body: JSON.stringify(payload)
    });
  } else {
    await supabaseFetch('nfc_accounts', {
      method: 'POST',
      headers: { 'Prefer': 'resolution=merge-duplicates' },
      body: JSON.stringify(payload)
    });
  }

  return acc;
}
async function resetUserAccountByAdmin(slot) {
  const accounts = getAllAccountsMetadataLocal();
  const idx = accounts.findIndex(a => a.slot === Number(slot));
  if (idx === -1) return null;

  const token = accounts[idx].token;
  const nextResetVersion = (accounts[idx].resetVersion || 1) + 1;

  // Delete encrypted vault locally
  const hash = await sha256Hex(token);
  localStorage.removeItem(VAULT_PREFIX + hash);

  // Reset metadata counters
  accounts[idx] = {
    ...accounts[idx],
    lastAccessedAt: null,
    itemCount: 0,
    listCount: 0,
    resetVersion: nextResetVersion
  };
  saveAccountsMetadataLocal(accounts);

  // Sync reset to Cloud if enabled
  const acc = accounts[idx];
  const payload = {
    slot: acc.slot,
    token: acc.token,
    status: acc.status,
    admin_note: acc.adminNote,
    last_accessed_at: null,
    item_count: 0,
    list_count: 0,
    reset_version: nextResetVersion,
    updated_at: new Date().toISOString()
  };

  const cfg = getCloudConfig();
  if (isFirebaseConfig(cfg)) {
    await firebaseFetch(`nfc_vaults/${hash}`, { method: 'DELETE' });
    await firebaseFetch(`nfc_accounts/slot_${acc.slot}`, {
      method: 'PUT',
      body: JSON.stringify(payload)
    });
  } else {
    await supabaseFetch(`nfc_vaults?token_hash=eq.${hash}`, { method: 'DELETE' });
    await supabaseFetch('nfc_accounts', {
      method: 'POST',
      headers: { 'Prefer': 'resolution=merge-duplicates' },
      body: JSON.stringify(payload)
    });
  }

  if (syncChannel) syncChannel.postMessage({ type: 'vault_reset', token });
  return acc;
}

// Create initial default workspace when a user scans their NFC tag for the first time
function createDefaultUserVault() {
  const defaultListId = 'list_' + Date.now();
  return {
    activeListId: defaultListId,
    activeCategoryFilter: 'ALL',
    customListCategories: [],
    lists: [
      {
        id: defaultListId,
        name: t('catKitchen'),
        category: t('catKitchen'),
        themeId: 'paper',
        fontId: 'sans',
        createdAt: Date.now(),
        items: []
      }
    ]
  };
}

// 3-Day (72-hour) Auto-Delete Engine for checked items
function purgeExpiredCheckedItems(vault) {
  if (!vault || !Array.isArray(vault.lists)) return { vault, removedCount: 0 };
  const now = Date.now();
  let removedCount = 0;

  vault.lists.forEach(list => {
    if (!Array.isArray(list.items)) list.items = [];
    const before = list.items.length;
    list.items = list.items.filter(item => {
      if (item.checked && item.checkedAt) {
        const elapsed = now - item.checkedAt;
        if (elapsed >= THREE_DAYS_MS) {
          return false; // Auto-delete after 3 days!
        }
      }
      return true;
    });
    removedCount += (before - list.items.length);
  });

  return { vault, removedCount };
}
function getTotalItemCount(vault) {
  if (!vault || !Array.isArray(vault.lists)) return 0;
  return vault.lists.reduce((sum, list) => sum + (Array.isArray(list.items) ? list.items.length : 0), 0);
}

// Load User's Encrypted Vault by NFC Token
async function loadUserSession(token) {
  const account = findAccountByToken(token);
  if (!account) {
    return { status: 'invalid', account: null, vault: null };
  }

  // Check cloud status if enabled
  const cfg = getCloudConfig();
  if (cfg.enabled) {
    if (isFirebaseConfig(cfg)) {
      const remoteAcc = await firebaseFetch(`nfc_accounts/slot_${account.slot}`);
      if (remoteAcc && typeof remoteAcc === 'object') {
        account.status = remoteAcc.status || account.status;
        account.resetVersion = remoteAcc.reset_version || remoteAcc.resetVersion || account.resetVersion;
      }
    } else {
      const remoteAcc = await supabaseFetch(`nfc_accounts?slot=eq.${account.slot}&select=*`);
      if (Array.isArray(remoteAcc) && remoteAcc[0]) {
        account.status = remoteAcc[0].status;
        account.resetVersion = remoteAcc[0].reset_version || account.resetVersion;
      }
    }
  }

  if (account.status === 'passive') {
    return { status: 'passive', account, vault: null };
  }

  const hash = await sha256Hex(account.token);
  let vault = null;

  // Try Cloud Vault first if configured
  if (cfg.enabled) {
    if (isFirebaseConfig(cfg)) {
      const remoteVault = await firebaseFetch(`nfc_vaults/${hash}`);
      if (remoteVault && remoteVault.encrypted_payload) {
        vault = await decryptPayload(account.token, remoteVault.encrypted_payload);
      }
    } else {
      const remoteVault = await supabaseFetch(`nfc_vaults?token_hash=eq.${hash}&select=*`);
      if (Array.isArray(remoteVault) && remoteVault[0] && remoteVault[0].encrypted_payload) {
        vault = await decryptPayload(account.token, remoteVault[0].encrypted_payload);
      }
    }
  }

  // Fallback to Local Encrypted Vault
  if (!vault) {
    const localCipher = localStorage.getItem(VAULT_PREFIX + hash);
    if (localCipher) {
      vault = await decryptPayload(account.token, localCipher);
    }
  }

  if (!vault || !Array.isArray(vault.lists) || vault.lists.length === 0) {
    vault = createDefaultUserVault();
  }

  // Run 3-day auto-delete cleanup on load
  const { vault: cleanedVault } = purgeExpiredCheckedItems(vault);

  // Save & update metadata stats (lastAccessedAt, itemCount, listCount) without exposing content
  await saveUserVault(account.token, cleanedVault);

  return { status: 'active', account: findAccountByToken(account.token), vault: cleanedVault };
}
async function saveUserVault(token, vault) {
  const account = findAccountByToken(token);
  if (!account) return;

  purgeExpiredCheckedItems(vault);

  const hash = await sha256Hex(account.token);
  const cipher = await encryptPayload(account.token, vault);
  localStorage.setItem(VAULT_PREFIX + hash, cipher);

  const totalItems = getTotalItemCount(vault);
  const totalLists = Array.isArray(vault.lists) ? vault.lists.length : 0;
  const nowIso = new Date().toISOString();

  // Update only anonymous aggregate counts + timestamp in admin metadata
  await updateAccountAdminFields(account.slot, {
    lastAccessedAt: nowIso,
    itemCount: totalItems,
    listCount: totalLists
  });

  // Push encrypted vault to Cloud if enabled
  const vaultPayload = {
    token_hash: hash,
    encrypted_payload: cipher,
    reset_version: account.resetVersion || 1,
    updated_at: nowIso
  };
  const cfg = getCloudConfig();
  if (isFirebaseConfig(cfg)) {
    await firebaseFetch(`nfc_vaults/${hash}`, {
      method: 'PUT',
      body: JSON.stringify(vaultPayload)
    });
  } else {
    await supabaseFetch('nfc_vaults', {
      method: 'POST',
      headers: { 'Prefer': 'resolution=merge-duplicates' },
      body: JSON.stringify(vaultPayload)
    });
  }

  if (syncChannel) {
    syncChannel.postMessage({ type: 'vault_updated', token: account.token });
  }
}
function onSyncMessage(callback) {
  if (syncChannel) {
    syncChannel.onmessage = (ev) => callback(ev.data);
  }
  window.addEventListener('storage', () => {
    callback({ type: 'storage_event' });
  });
}
function getFullNfcUrl(token) {
  return `${APP_DOMAIN}/${token}`;
}





const appRoot = document.getElementById('app');

// Application State
let currentMode = 'user'; // 'user' | 'admin'
let currentToken = null;
let sessionStatus = 'active';
let userVault = null;
let selectedItemSection = '';
let openStyleForListId = null; // Tracks which specific list has its inline style panel open
let openExpiryItemId = null; // Tracks which checked item has its hourglass countdown info open
let showNewListModal = false;
let newListDraftThemeId = 'paper';
let newListDraftFontId = 'sans';

// Admin State
const ADMIN_AUTH_KEY = 'tyn_admin_authenticated_v1';
const ADMIN_PASS_KEY = 'tyn_admin_password_v1';
let adminAccounts = [];
let adminSearchQuery = '';
let adminFilterStatus = 'all'; // 'all' | 'active' | 'passive' | 'used'
let adminPage = 1;
const ADMIN_PAGE_SIZE = 50;
let showCloudModal = false;

function getAdminPassword() {
  return localStorage.getItem(ADMIN_PASS_KEY) || 'tyn2026';
}

function isAdminLoggedIn() {
  return sessionStorage.getItem(ADMIN_AUTH_KEY) === 'true';
}

// Parse URL to determine if Admin or NFC User Token
function resolveRoute() {
  const params = new URLSearchParams(window.location.search);
  const rawHash = window.location.hash.replace(/^#\/?/, '').trim();
  const hashParams = new URLSearchParams(rawHash.includes('=') ? rawHash : '');
  const pathSeg = window.location.pathname.replace(/^\/+|\/+$/g, '').split('/').pop();

  if (
    params.get('admin') === '1' ||
    hashParams.get('admin') === '1' ||
    rawHash === 'admin' ||
    pathSeg === 'admin'
  ) {
    currentMode = 'admin';
    return;
  }

  currentMode = 'user';
  const queryToken = params.get('u') || params.get('token') || hashParams.get('u');
  if (queryToken) {
    currentToken = queryToken.trim().toLowerCase();
  } else if (rawHash && !rawHash.includes('=') && rawHash.length >= 6 && rawHash !== 'admin') {
    currentToken = rawHash.toLowerCase();
  } else if (pathSeg && pathSeg !== 'index.html' && pathSeg !== '404.html' && pathSeg.length >= 6 && window.location.protocol !== 'file:') {
    currentToken = pathSeg.toLowerCase();
  } else {
    currentToken = INITIAL_TOKENS[0];
  }
}

// Build scoped inline CSS variables strictly for a single list sheet
function getScopedListStyleVars(list) {
  const theme = LIST_THEMES.find(th => th.id === (list?.themeId || 'paper')) || LIST_THEMES[0];
  const font = LIST_FONTS.find(f => f.id === (list?.fontId || 'sans')) || LIST_FONTS[0];

  return {
    theme,
    font,
    styleAttr: [
      `--list-bg:${theme.bg}`,
      `--list-surface:${theme.card}`,
      `--list-text:${theme.text}`,
      `--list-accent:${theme.accent}`,
      `--list-border:${theme.border}`,
      `--list-font:${font.family}`,
      `--list-font-scale:${font.scale || '1rem'}`
    ].join(';')
  };
}

function getActiveList() {
  if (!userVault || !Array.isArray(userVault.lists) || userVault.lists.length === 0) return null;
  const found = userVault.lists.find(l => l.id === userVault.activeListId);
  return found || userVault.lists[0];
}

function getDefaultListCategories() {
  const base = [
    t('catKitchen'),
    t('catPantry'),
    t('catBathroom'),
    t('catMarket'),
    t('catHome')
  ];
  const custom = Array.isArray(userVault?.customListCategories) ? userVault.customListCategories : [];
  const all = [...new Set([...base, ...custom, ...(userVault?.lists || []).map(l => l.category).filter(Boolean)])];
  return all;
}

function getDefaultItemSections(activeList) {
  const base = [
    t('secGeneral'),
    t('secProduce'),
    t('secDairy'),
    t('secMeat'),
    t('secBakery'),
    t('secPantry'),
    t('secCleaning'),
    t('secPersonal')
  ];
  const inList = (activeList?.items || []).map(i => i.section).filter(Boolean);
  return [...new Set([...base, ...inList])];
}

function formatRemainingExpiry(checkedAt) {
  if (!checkedAt) return '';
  const remainingMs = Math.max(0, THREE_DAYS_MS - (Date.now() - checkedAt));
  const totalHours = Math.max(1, Math.ceil(remainingMs / (1000 * 60 * 60)));
  const days = Math.floor(totalHours / 24);
  const hours = totalHours % 24;
  return t('autoDeleteRemaining', { d: days, h: hours });
}

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ============================================================================
// RENDER USER MINIMALIST NOTE INTERFACE (Scoped Per-List Appearance)
// ============================================================================
function renderUserApp() {
  if (sessionStatus === 'invalid') {
    appRoot.innerHTML = `
      <div class="status-center">
        <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <h2 style="font-size:1.15rem;font-weight:600;">${escapeHtml(t('invalidTagTitle'))}</h2>
        <p style="font-size:0.88rem;opacity:0.65;max-width:300px;">${escapeHtml(t('invalidTagDesc'))}</p>
      </div>
      ${renderPreviewDock()}
    `;
    bindPreviewDockEvents();
    return;
  }

  if (sessionStatus === 'passive') {
    appRoot.innerHTML = `
      <div class="status-center">
        <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
        <h2 style="font-size:1.15rem;font-weight:600;">${escapeHtml(t('inactiveTagTitle'))}</h2>
        <p style="font-size:0.88rem;opacity:0.65;max-width:300px;">${escapeHtml(t('inactiveTagDesc'))}</p>
      </div>
      ${renderPreviewDock()}
    `;
    bindPreviewDockEvents();
    return;
  }

  const activeList = getActiveList();
  const scoped = getScopedListStyleVars(activeList);

  const totalItems = getTotalItemCount(userVault);
  const catFilter = userVault.activeCategoryFilter || 'ALL';
  const listCategories = getDefaultListCategories();

  const visibleLists = catFilter === 'ALL'
    ? userVault.lists
    : userVault.lists.filter(l => l.category === catFilter);

  const itemSections = getDefaultItemSections(activeList);
  if (!selectedItemSection) {
    selectedItemSection = t('secGeneral');
  }

  // Group items by their section/category inside the active list
  const items = activeList?.items || [];
  const grouped = new Map();
  items.forEach(item => {
    const sec = item.section || t('secGeneral');
    if (!grouped.has(sec)) grouped.set(sec, []);
    grouped.get(sec).push(item);
  });

  // Sort inside each group: unchecked first, checked below
  grouped.forEach((arr) => {
    arr.sort((a, b) => Number(Boolean(a.checked)) - Number(Boolean(b.checked)));
  });

  const showGroupHeaders = grouped.size > 1 || (grouped.size === 1 && !grouped.has(t('secGeneral')));
  const isStylePanelOpenForThisList = Boolean(activeList && openStyleForListId === activeList.id);

  appRoot.innerHTML = `
    <main class="note-shell">
      <!-- Top Minimal Navigation: List Categories & Multiple Lists (Always clean neutral shell) -->
      <header class="top-nav">
        <div class="category-bar">
          <button class="cat-chip ${catFilter === 'ALL' ? 'active' : ''}" data-cat-filter="ALL">
            ${escapeHtml(t('allLists'))}
          </button>
          ${listCategories.map(cat => `
            <button class="cat-chip ${catFilter === cat ? 'active' : ''}" data-cat-filter="${escapeHtml(cat)}">
              ${escapeHtml(cat)}
            </button>
          `).join('')}
        </div>

        <div class="lists-row">
          <div class="list-tabs">
            ${visibleLists.map(list => {
              const listTheme = LIST_THEMES.find(th => th.id === (list.themeId || 'paper')) || LIST_THEMES[0];
              return `
                <button class="list-tab ${list.id === activeList?.id ? 'active' : ''}" data-list-id="${escapeHtml(list.id)}">
                  <span class="tab-theme-dot" style="background:${listTheme.bg};"></span>
                  <span>${escapeHtml(list.name)}</span>
                </button>
              `;
            }).join('')}
            <button class="list-tab-add" id="btnNewList" title="${escapeHtml(t('newListTitle'))}">+</button>
          </div>
        </div>
      </header>

      <!-- Active Note Sheet (Scoped with its OWN color theme & font) -->
      ${activeList ? `
        <section
          class="note-sheet"
          style="${escapeHtml(scoped.styleAttr)}"
          ${scoped.theme.dark ? 'data-list-dark="true"' : ''}
        >
          <div class="note-header">
            <input
              type="text"
              id="listTitleInput"
              class="note-title-input"
              value="${escapeHtml(activeList.name)}"
              placeholder="${escapeHtml(t('listNamePlaceholder'))}"
              maxlength="60"
            />
            <div class="note-header-actions">
              <span class="note-counter">${totalItems}/${MAX_ITEMS_PER_USER}</span>
              <button
                type="button"
                class="list-style-btn ${isStylePanelOpenForThisList ? 'active' : ''}"
                id="btnToggleListStyle"
                title="${escapeHtml(t('appearance'))}"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"></circle>
                  <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"></circle>
                  <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"></circle>
                  <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"></circle>
                  <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"></path>
                </svg>
                <span>${escapeHtml(t('appearance'))}</span>
              </button>
            </div>
          </div>

          <!-- Per-List Inline Customization Panel (Applies ONLY to this list) -->
          ${isStylePanelOpenForThisList ? renderInlineListStylePanel(activeList, listCategories) : ''}

          <!-- Add Item Form -->
          <form id="addItemForm" class="add-item-bar" autocomplete="off">
            <div class="add-input-wrap">
              <input
                type="text"
                id="newItemInput"
                class="add-item-input"
                placeholder="${totalItems >= MAX_ITEMS_PER_USER ? escapeHtml(t('limitReached')) : escapeHtml(t('newItemPlaceholder'))}"
                ${totalItems >= MAX_ITEMS_PER_USER ? 'disabled' : ''}
                maxlength="120"
              />
              <button type="submit" class="add-submit-btn" ${totalItems >= MAX_ITEMS_PER_USER ? 'disabled' : ''}>+</button>
            </div>

            <!-- In-List Section / Category Pills -->
            <div class="section-pills">
              ${itemSections.map(sec => `
                <button type="button" class="sec-pill ${selectedItemSection === sec ? 'active' : ''}" data-sec="${escapeHtml(sec)}">
                  ${escapeHtml(sec)}
                </button>
              `).join('')}
              <button type="button" class="sec-pill" id="btnAddCustomSection">+</button>
            </div>
          </form>

          <!-- Checklist Items -->
          <div class="items-container">
            ${items.length === 0 ? `
              <div class="empty-note">${escapeHtml(t('emptyNoteHint'))}</div>
            ` : Array.from(grouped.entries()).map(([secName, secItems]) => `
              <div class="item-group">
                ${showGroupHeaders ? `<div class="group-title">${escapeHtml(secName)}</div>` : ''}
                ${secItems.map(item => `
                  <div class="check-row ${item.checked ? 'checked' : ''}" data-item-id="${escapeHtml(item.id)}">
                    <button type="button" class="check-box" data-toggle-id="${escapeHtml(item.id)}">
                      <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </button>
                    <span class="item-label" data-toggle-id="${escapeHtml(item.id)}">${escapeHtml(item.text)}</span>
                    ${item.checked && item.checkedAt ? `
                      <button
                        type="button"
                        class="hourglass-btn ${openExpiryItemId === item.id ? 'active' : ''}"
                        data-hourglass-id="${escapeHtml(item.id)}"
                        title="${escapeHtml(t('autoDeleteInfo'))}"
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M5 22h14"></path>
                          <path d="M5 2h14"></path>
                          <path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"></path>
                          <path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"></path>
                        </svg>
                      </button>
                    ` : ''}
                    <button type="button" class="item-del-btn" data-delete-id="${escapeHtml(item.id)}">&times;</button>
                  </div>
                  ${item.checked && item.checkedAt && openExpiryItemId === item.id ? `
                    <div class="expiry-info-box">
                      <span>${escapeHtml(t('autoDeleteInfo'))}</span>
                      <span class="rem-time">${escapeHtml(formatRemainingExpiry(item.checkedAt))}</span>
                    </div>
                  ` : ''}
                `).join('')}
              </div>
            `).join('')}
          </div>
        </section>
      ` : ''}
    </main>

    ${showNewListModal ? renderNewListModal(listCategories) : ''}
    ${renderPreviewDock()}
  `;

  bindUserEvents(activeList);
  bindPreviewDockEvents();
}

// Inline style customization panel embedded right inside the active list card
function renderInlineListStylePanel(activeList, listCategories) {
  const checkedCount = (activeList.items || []).filter(i => i.checked).length;
  return `
    <div class="list-style-panel">
      <div class="sheet-row">
        <span class="sheet-label">${escapeHtml(activeList.name)} — ${escapeHtml(t('colorTheme'))}</span>
        <div class="color-swatches">
          ${LIST_THEMES.map(th => `
            <button
              type="button"
              class="color-dot ${(activeList.themeId || 'paper') === th.id ? 'active' : ''}"
              style="background:${th.bg};"
              data-theme-id="${th.id}"
              title="${th.name}"
            ></button>
          `).join('')}
        </div>
      </div>

      <div class="sheet-row">
        <span class="sheet-label">${escapeHtml(activeList.name)} — ${escapeHtml(t('fontStyle'))}</span>
        <div class="font-options">
          ${LIST_FONTS.map(f => `
            <button
              type="button"
              class="font-btn ${(activeList.fontId || 'sans') === f.id ? 'active' : ''}"
              style="font-family:${f.family};"
              data-font-id="${f.id}"
            >
              ${escapeHtml(f.name)}
            </button>
          `).join('')}
        </div>
      </div>

      <div class="sheet-row">
        <span class="sheet-label">${escapeHtml(t('listCategory'))}</span>
        <div class="section-pills">
          ${listCategories.map(cat => `
            <button
              type="button"
              class="sec-pill ${activeList.category === cat ? 'active' : ''}"
              data-change-list-cat="${escapeHtml(cat)}"
            >
              ${escapeHtml(cat)}
            </button>
          `).join('')}
        </div>
      </div>

      <div class="sheet-actions">
        <div style="display:flex;gap:8px;">
          ${userVault.lists.length > 1 ? `
            <button type="button" class="btn-danger-text" id="btnDeleteCurrentList">${escapeHtml(t('deleteList'))}</button>
          ` : ''}
          ${checkedCount > 0 ? `
            <button type="button" class="btn-danger-text" id="btnClearChecked">${escapeHtml(t('clearChecked'))}</button>
          ` : ''}
        </div>
        <button type="button" class="btn-primary-pill" id="btnCloseStyle">${escapeHtml(t('save'))}</button>
      </div>
    </div>
  `;
}

function renderNewListModal(listCategories) {
  return `
    <div class="modal-backdrop" id="newListBackdrop">
      <form class="style-sheet" id="createListForm" onclick="event.stopPropagation()">
        <div class="sheet-row">
          <span class="sheet-label" style="color:#6B7280;">${escapeHtml(t('newListTitle'))}</span>
          <div class="add-input-wrap" style="background:#F9FAFB;border-color:#E5E7EB;">
            <input
              type="text"
              id="newListNameInput"
              class="add-item-input"
              style="color:#111827;font-family:'Inter',sans-serif;"
              placeholder="${escapeHtml(t('listNamePlaceholder'))}"
              required
              maxlength="50"
              autofocus
            />
          </div>
        </div>

        <div class="sheet-row">
          <span class="sheet-label" style="color:#6B7280;">${escapeHtml(t('listCategory'))}</span>
          <div class="add-input-wrap" style="background:#F9FAFB;border-color:#E5E7EB;">
            <input
              type="text"
              id="newListCatInput"
              class="add-item-input"
              style="color:#111827;font-family:'Inter',sans-serif;"
              list="existingCatsList"
              placeholder="${escapeHtml(t('catKitchen'))}"
              value="${escapeHtml(listCategories[0] || t('catKitchen'))}"
              maxlength="40"
            />
            <datalist id="existingCatsList">
              ${listCategories.map(c => `<option value="${escapeHtml(c)}"></option>`).join('')}
            </datalist>
          </div>
        </div>

        <div class="sheet-row">
          <span class="sheet-label" style="color:#6B7280;">${escapeHtml(t('colorTheme'))}</span>
          <div class="color-swatches">
            ${LIST_THEMES.map(th => `
              <button
                type="button"
                class="color-dot ${newListDraftThemeId === th.id ? 'active' : ''}"
                style="background:${th.bg};"
                data-draft-theme="${th.id}"
                title="${th.name}"
              ></button>
            `).join('')}
          </div>
        </div>

        <div class="sheet-row">
          <span class="sheet-label" style="color:#6B7280;">${escapeHtml(t('fontStyle'))}</span>
          <div class="font-options">
            ${LIST_FONTS.map(f => `
              <button
                type="button"
                class="font-btn ${newListDraftFontId === f.id ? 'active' : ''}"
                style="font-family:${f.family};background:${newListDraftFontId === f.id ? '#111827' : '#F9FAFB'};color:${newListDraftFontId === f.id ? '#FFF' : '#111827'};border-color:#E5E7EB;"
                data-draft-font="${f.id}"
              >
                ${escapeHtml(f.name)}
              </button>
            `).join('')}
          </div>
        </div>

        <div class="sheet-actions" style="border-color:#E5E7EB;">
          <button type="button" class="btn-danger-text" id="btnCancelNewList" style="color:#6B7280;">${escapeHtml(t('cancel'))}</button>
          <button type="submit" class="btn-primary-pill" style="background:#111827;color:#FFF;">${escapeHtml(t('createList'))}</button>
        </div>
      </form>
    </div>
  `;
}

function bindUserEvents(activeList) {
  // Filter by List Category
  document.querySelectorAll('[data-cat-filter]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const cat = btn.getAttribute('data-cat-filter');
      userVault.activeCategoryFilter = cat;
      if (cat !== 'ALL') {
        const matching = userVault.lists.filter(l => l.category === cat);
        if (matching.length > 0 && !matching.some(l => l.id === userVault.activeListId)) {
          userVault.activeListId = matching[0].id;
        }
      }
      openStyleForListId = null;
      await saveUserVault(currentToken, userVault);
      renderUserApp();
    });
  });

  // Switch active list (Each list renders with its own independent themeId & fontId)
  document.querySelectorAll('[data-list-id]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const targetId = btn.getAttribute('data-list-id');
      userVault.activeListId = targetId;
      openStyleForListId = null;
      await saveUserVault(currentToken, userVault);
      renderUserApp();
    });
  });

  // Open new list modal (Resets draft theme & font to clean independent defaults)
  const btnNewList = document.getElementById('btnNewList');
  if (btnNewList) {
    btnNewList.addEventListener('click', () => {
      newListDraftThemeId = 'paper';
      newListDraftFontId = 'sans';
      showNewListModal = true;
      renderUserApp();
      setTimeout(() => document.getElementById('newListNameInput')?.focus(), 40);
    });
  }

  // Toggle inline per-list style panel inside the active list header
  const btnToggleListStyle = document.getElementById('btnToggleListStyle');
  if (btnToggleListStyle && activeList) {
    btnToggleListStyle.addEventListener('click', () => {
      openStyleForListId = openStyleForListId === activeList.id ? null : activeList.id;
      renderUserApp();
    });
  }

  // Edit active list name
  const listTitleInput = document.getElementById('listTitleInput');
  if (listTitleInput && activeList) {
    listTitleInput.addEventListener('change', async () => {
      const val = listTitleInput.value.trim();
      if (val) {
        activeList.name = val;
        await saveUserVault(currentToken, userVault);
        renderUserApp();
      }
    });
  }

  // Select section pill for new item
  document.querySelectorAll('[data-sec]').forEach(btn => {
    btn.addEventListener('click', () => {
      selectedItemSection = btn.getAttribute('data-sec');
      renderUserApp();
      document.getElementById('newItemInput')?.focus();
    });
  });

  // Custom section button
  const btnAddCustomSection = document.getElementById('btnAddCustomSection');
  if (btnAddCustomSection) {
    btnAddCustomSection.addEventListener('click', () => {
      const custom = window.prompt(t('customSectionPrompt'));
      if (custom && custom.trim()) {
        selectedItemSection = custom.trim();
        renderUserApp();
        document.getElementById('newItemInput')?.focus();
      }
    });
  }

  // Add item form submission
  const addItemForm = document.getElementById('addItemForm');
  if (addItemForm && activeList) {
    addItemForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const input = document.getElementById('newItemInput');
      const text = (input?.value || '').trim();
      if (!text) return;

      if (getTotalItemCount(userVault) >= MAX_ITEMS_PER_USER) {
        return;
      }

      activeList.items.unshift({
        id: 'item_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
        text,
        section: selectedItemSection || t('secGeneral'),
        checked: false,
        checkedAt: null,
        createdAt: Date.now()
      });

      await saveUserVault(currentToken, userVault);
      renderUserApp();
      document.getElementById('newItemInput')?.focus();
    });
  }

  // Toggle item check/uncheck (starts or clears the 3-day auto-delete timer)
  document.querySelectorAll('[data-toggle-id]').forEach(el => {
    el.addEventListener('click', async () => {
      if (!activeList) return;
      const itemId = el.getAttribute('data-toggle-id');
      const item = activeList.items.find(i => i.id === itemId);
      if (!item) return;

      item.checked = !item.checked;
      item.checkedAt = item.checked ? Date.now() : null;
      if (!item.checked && openExpiryItemId === itemId) {
        openExpiryItemId = null;
      }

      await saveUserVault(currentToken, userVault);
      renderUserApp();
    });
  });

  // Toggle hourglass countdown details
  document.querySelectorAll('[data-hourglass-id]').forEach(btn => {
    btn.addEventListener('click', () => {
      const itemId = btn.getAttribute('data-hourglass-id');
      openExpiryItemId = openExpiryItemId === itemId ? null : itemId;
      renderUserApp();
    });
  });

  // Delete item immediately
  document.querySelectorAll('[data-delete-id]').forEach(btn => {
    btn.addEventListener('click', async () => {
      if (!activeList) return;
      const itemId = btn.getAttribute('data-delete-id');
      if (openExpiryItemId === itemId) openExpiryItemId = null;
      activeList.items = activeList.items.filter(i => i.id !== itemId);
      await saveUserVault(currentToken, userVault);
      renderUserApp();
    });
  });

  // Per-list inline style panel events (strictly modifies ONLY activeList)
  if (activeList && openStyleForListId === activeList.id) {
    document.getElementById('btnCloseStyle')?.addEventListener('click', () => {
      openStyleForListId = null;
      renderUserApp();
    });

    document.querySelectorAll('[data-theme-id]').forEach(btn => {
      btn.addEventListener('click', async () => {
        activeList.themeId = btn.getAttribute('data-theme-id');
        await saveUserVault(currentToken, userVault);
        renderUserApp();
      });
    });

    document.querySelectorAll('[data-font-id]').forEach(btn => {
      btn.addEventListener('click', async () => {
        activeList.fontId = btn.getAttribute('data-font-id');
        await saveUserVault(currentToken, userVault);
        renderUserApp();
      });
    });

    document.querySelectorAll('[data-change-list-cat]').forEach(btn => {
      btn.addEventListener('click', async () => {
        activeList.category = btn.getAttribute('data-change-list-cat');
        await saveUserVault(currentToken, userVault);
        renderUserApp();
      });
    });

    document.getElementById('btnDeleteCurrentList')?.addEventListener('click', async () => {
      if (userVault.lists.length <= 1) return;
      userVault.lists = userVault.lists.filter(l => l.id !== activeList.id);
      userVault.activeListId = userVault.lists[0].id;
      openStyleForListId = null;
      await saveUserVault(currentToken, userVault);
      renderUserApp();
    });

    document.getElementById('btnClearChecked')?.addEventListener('click', async () => {
      activeList.items = activeList.items.filter(i => !i.checked);
      openStyleForListId = null;
      await saveUserVault(currentToken, userVault);
      renderUserApp();
    });
  }

  // New List Modal events
  const newListBackdrop = document.getElementById('newListBackdrop');
  if (newListBackdrop) {
    newListBackdrop.addEventListener('click', () => {
      showNewListModal = false;
      renderUserApp();
    });
    document.getElementById('btnCancelNewList')?.addEventListener('click', () => {
      showNewListModal = false;
      renderUserApp();
    });

    document.querySelectorAll('[data-draft-theme]').forEach(btn => {
      btn.addEventListener('click', () => {
        const currentName = document.getElementById('newListNameInput')?.value || '';
        const currentCat = document.getElementById('newListCatInput')?.value || '';
        newListDraftThemeId = btn.getAttribute('data-draft-theme');
        renderUserApp();
        const nameEl = document.getElementById('newListNameInput');
        const catEl = document.getElementById('newListCatInput');
        if (nameEl) nameEl.value = currentName;
        if (catEl) catEl.value = currentCat;
      });
    });

    document.querySelectorAll('[data-draft-font]').forEach(btn => {
      btn.addEventListener('click', () => {
        const currentName = document.getElementById('newListNameInput')?.value || '';
        const currentCat = document.getElementById('newListCatInput')?.value || '';
        newListDraftFontId = btn.getAttribute('data-draft-font');
        renderUserApp();
        const nameEl = document.getElementById('newListNameInput');
        const catEl = document.getElementById('newListCatInput');
        if (nameEl) nameEl.value = currentName;
        if (catEl) catEl.value = currentCat;
      });
    });

    document.getElementById('createListForm')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('newListNameInput')?.value.trim();
      const cat = document.getElementById('newListCatInput')?.value.trim() || t('catKitchen');
      if (!name) return;

      const newList = {
        id: 'list_' + Date.now(),
        name,
        category: cat,
        themeId: newListDraftThemeId || 'paper',
        fontId: newListDraftFontId || 'sans',
        createdAt: Date.now(),
        items: []
      };
      userVault.lists.push(newList);
      userVault.activeListId = newList.id;
      openStyleForListId = null;
      if (userVault.activeCategoryFilter !== 'ALL' && userVault.activeCategoryFilter !== cat) {
        userVault.activeCategoryFilter = 'ALL';
      }
      showNewListModal = false;
      await saveUserVault(currentToken, userVault);
      renderUserApp();
    });
  }
}

// ============================================================================
// RENDER ADMIN PANEL (1,000 User Links Management, Zero Content Access)
// ============================================================================
async function renderAdminApp() {
  if (!isAdminLoggedIn()) {
    appRoot.innerHTML = `
      <div class="admin-wrapper" style="display:flex;align-items:center;justify-content:center;">
        <form id="adminLoginForm" style="background:#fff;border:1px solid #E5E7EB;border-radius:18px;padding:28px;width:100%;max-width:380px;display:flex;flex-direction:column;gap:14px;box-shadow:0 10px 25px rgba(0,0,0,0.04);">
          <div>
            <h2 style="font-size:1.2rem;font-weight:700;color:#111827;">ThingsYouNeed Admin</h2>
            <p style="font-size:0.82rem;color:#6B7280;margin-top:4px;">notes.thingsyourneed.com • 1,000 NFC Kullanıcı Yönetimi</p>
          </div>
          <div style="display:flex;flex-direction:column;gap:6px;">
            <label style="font-size:0.78rem;font-weight:600;color:#374151;">Admin Şifresi</label>
            <input type="password" id="adminPassInput" class="admin-search" style="min-width:unset;" placeholder="Şifre (Varsayılan: tyn2026)" required autofocus />
          </div>
          <div id="adminLoginErr" style="color:#DC2626;font-size:0.8rem;display:none;">Hatalı yönetici şifresi.</div>
          <button type="submit" class="admin-btn primary" style="justify-content:center;padding:10px;">Giriş Yap</button>
          <button type="button" id="btnBackToUser" class="admin-btn" style="justify-content:center;">Kullanıcı Arayüzüne Dön</button>
        </form>
      </div>
    `;

    document.getElementById('adminLoginForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = document.getElementById('adminPassInput')?.value || '';
      if (val === getAdminPassword()) {
        sessionStorage.setItem(ADMIN_AUTH_KEY, 'true');
        renderAdminApp();
      } else {
        const err = document.getElementById('adminLoginErr');
        if (err) err.style.display = 'block';
      }
    });

    document.getElementById('btnBackToUser')?.addEventListener('click', () => {
      switchToUserToken(INITIAL_TOKENS[0]);
    });
    return;
  }

  adminAccounts = await getAllAccountsForAdmin();

  const activeCount = adminAccounts.filter(a => a.status === 'active').length;
  const passiveCount = adminAccounts.filter(a => a.status === 'passive').length;
  const usedCount = adminAccounts.filter(a => a.lastAccessedAt || a.itemCount > 0).length;
  const totalItemsAll = adminAccounts.reduce((s, a) => s + (a.itemCount || 0), 0);

  const q = adminSearchQuery.trim().toLowerCase();
  const filtered = adminAccounts.filter(acc => {
    if (adminFilterStatus === 'active' && acc.status !== 'active') return false;
    if (adminFilterStatus === 'passive' && acc.status !== 'passive') return false;
    if (adminFilterStatus === 'used' && !acc.lastAccessedAt && !acc.itemCount) return false;
    if (!q) return true;
    const slotStr = `#${String(acc.slot).padStart(4, '0')}`;
    return (
      slotStr.toLowerCase().includes(q) ||
      String(acc.slot).includes(q) ||
      acc.token.toLowerCase().includes(q) ||
      (acc.adminNote || '').toLowerCase().includes(q)
    );
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / ADMIN_PAGE_SIZE));
  if (adminPage > totalPages) adminPage = totalPages;
  const startIdx = (adminPage - 1) * ADMIN_PAGE_SIZE;
  const pageItems = filtered.slice(startIdx, startIdx + ADMIN_PAGE_SIZE);
  const cloudCfg = getCloudConfig();

  appRoot.innerHTML = `
    <div class="admin-wrapper">
      <div class="admin-container">
        <!-- Topbar -->
        <header class="admin-topbar">
          <div class="admin-brand">
            <h1>notes.thingsyourneed.com — NFC Admin Paneli</h1>
            <p>1.000 benzersiz şifresiz NFC bağlantısı yönetimi</p>
          </div>
          <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
            <span class="privacy-badge" title="Kullanıcı listeleri AES-GCM ile şifrelenir ve bu panelden erişilemez">
              🔒 Gizlilik Korumalı: Liste İçerikleri Gizli
            </span>
            <button type="button" class="admin-btn" id="btnCloudConfig">
              ☁️ ${cloudCfg.enabled ? 'Bulut DB Aktif' : 'Firebase / Bulut DB'}
            </button>
            <button type="button" class="admin-btn primary" id="btnExportCsv">
              ⬇️ 1.000 Linki İndir (CSV / Excel)
            </button>
            <button type="button" class="admin-btn" id="btnChangeAdminPass">🔑 Şifre</button>
            <button type="button" class="admin-btn" id="btnAdminLogout">Çıkış</button>
          </div>
        </header>

        <!-- Stats -->
        <section class="admin-stats-grid">
          <div class="stat-card">
            <div class="label">Toplam NFC Bağlantısı</div>
            <div class="val">1,000</div>
          </div>
          <div class="stat-card">
            <div class="label">Aktif / Pasif</div>
            <div class="val">${activeCount} <span style="font-size:0.95rem;color:#9CA3AF;">/ ${passiveCount}</span></div>
          </div>
          <div class="stat-card">
            <div class="label">Kullanılan Etiket</div>
            <div class="val">${usedCount}</div>
          </div>
          <div class="stat-card">
            <div class="label">Toplam Ürün Sayısı (İçerik Gizli)</div>
            <div class="val">${totalItemsAll}</div>
          </div>
        </section>

        <!-- Search & Filter Toolbar -->
        <section class="admin-toolbar">
          <input
            type="search"
            id="adminSearchInput"
            class="admin-search"
            placeholder="Slot (#0001), Token (e47ps8z5s4) veya Sipariş Notu ara..."
            value="${escapeHtml(adminSearchQuery)}"
          />
          <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
            <button type="button" class="admin-btn ${adminFilterStatus === 'all' ? 'primary' : ''}" data-filter="all">Tümü (1000)</button>
            <button type="button" class="admin-btn ${adminFilterStatus === 'active' ? 'primary' : ''}" data-filter="active">Aktif (${activeCount})</button>
            <button type="button" class="admin-btn ${adminFilterStatus === 'passive' ? 'primary' : ''}" data-filter="passive">Pasif (${passiveCount})</button>
            <button type="button" class="admin-btn ${adminFilterStatus === 'used' ? 'primary' : ''}" data-filter="used">Kullanılan (${usedCount})</button>
          </div>
        </section>

        <!-- Accounts Table -->
        <section class="admin-table-wrap">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Slot</th>
                <th>Özel NFC Linki</th>
                <th>Durum</th>
                <th>Yönetici Notu / Etiket</th>
                <th>Son Erişim</th>
                <th>İstatistik (İçerik Gizli)</th>
                <th>İşlemler</th>
              </tr>
            </thead>
            <tbody>
              ${pageItems.map(acc => {
                const fullUrl = getFullNfcUrl(acc.token);
                const lastDate = acc.lastAccessedAt
                  ? new Date(acc.lastAccessedAt).toLocaleString('tr-TR', { dateStyle: 'short', timeStyle: 'short' })
                  : 'Henüz okutulmadı';
                return `
                  <tr>
                    <td style="font-weight:700;color:#374151;">#${String(acc.slot).padStart(4, '0')}</td>
                    <td>
                      <div style="display:flex;align-items:center;gap:8px;">
                        <code class="token-code">${escapeHtml(fullUrl)}</code>
                        <button type="button" class="admin-btn" style="padding:4px 8px;font-size:0.74rem;" data-copy-url="${escapeHtml(fullUrl)}">Kopyala</button>
                        <button type="button" class="admin-btn" style="padding:4px 8px;font-size:0.74rem;" data-open-token="${escapeHtml(acc.token)}">Aç</button>
                      </div>
                    </td>
                    <td>
                      <span class="status-pill ${acc.status === 'active' ? 'active' : 'passive'}">
                        ${acc.status === 'active' ? '● Aktif' : '○ Pasif'}
                      </span>
                    </td>
                    <td>
                      <input
                        type="text"
                        class="note-inline-input"
                        placeholder="Örn: Sipariş #104..."
                        value="${escapeHtml(acc.adminNote || '')}"
                        data-note-slot="${acc.slot}"
                      />
                    </td>
                    <td style="color:#6B7280;font-size:0.8rem;">${escapeHtml(lastDate)}</td>
                    <td style="color:#4B5563;font-size:0.8rem;">
                      ${acc.listCount || 0} liste • <strong>${acc.itemCount || 0}</strong>/1000 ürün
                      <span style="color:#9CA3AF;font-size:0.72rem;display:block;">🔒 İçerik şifreli</span>
                    </td>
                    <td>
                      <div style="display:flex;align-items:center;gap:6px;">
                        <button type="button" class="admin-btn" style="padding:5px 9px;font-size:0.76rem;" data-toggle-slot="${acc.slot}">
                          ${acc.status === 'active' ? 'Pasife Al' : 'Aktifleştir'}
                        </button>
                        <button type="button" class="admin-btn danger" style="padding:5px 9px;font-size:0.76rem;" data-reset-slot="${acc.slot}">
                          Sıfırla
                        </button>
                      </div>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </section>

        <!-- Pagination -->
        <div style="display:flex;align-items:center;justify-content:space-between;padding:4px 6px;">
          <span style="font-size:0.82rem;color:#6B7280;">
            Toplam ${filtered.length} kayıttan ${startIdx + 1}-${Math.min(startIdx + ADMIN_PAGE_SIZE, filtered.length)} arası gösteriliyor
          </span>
          <div style="display:flex;align-items:center;gap:8px;">
            <button type="button" class="admin-btn" id="btnPrevPage" ${adminPage <= 1 ? 'disabled' : ''}>← Önceki</button>
            <span style="font-size:0.84rem;font-weight:600;">Sayfa ${adminPage} / ${totalPages}</span>
            <button type="button" class="admin-btn" id="btnNextPage" ${adminPage >= totalPages ? 'disabled' : ''}>Sonraki →</button>
          </div>
        </div>
      </div>
    </div>

    ${showCloudModal ? renderCloudConfigModal(cloudCfg) : ''}
    ${renderPreviewDock()}
  `;

  bindAdminEvents();
  bindPreviewDockEvents();
}

function renderCloudConfigModal(cloudCfg) {
  return `
    <div class="modal-backdrop" id="cloudModalBackdrop">
      <form class="style-sheet" id="cloudConfigForm" style="background:#fff;color:#111827;border-color:#E5E7EB;max-width:520px;" onclick="event.stopPropagation()">
        <div>
          <h3 style="font-size:1.05rem;font-weight:700;">Firebase / Bulut Veritabanı Senkronizasyonu</h3>
          <p style="font-size:0.8rem;color:#6B7280;margin-top:4px;">
            <strong>Firebase Realtime Database (En Kolay):</strong> Tablo oluşturmaya gerek yoktur. Firebase konsolunda <em>Realtime Database</em> oluşturup sadece <code>Database URL</code> adresini aşağıya yapıştırmanız yeterlidir.<br/>
            *(Alternatif olarak Supabase URL + Anon Key de girebilirsiniz).*
          </p>
        </div>

        <div class="sheet-row">
          <span class="sheet-label" style="color:#4B5563;">Firebase Realtime Database URL (veya Supabase URL)</span>
          <input type="url" id="supaUrlInput" class="admin-search" placeholder="https://proje-adiniz-default-rtdb.firebaseio.com" value="${escapeHtml(cloudCfg.url)}" />
        </div>

        <div class="sheet-row">
          <span class="sheet-label" style="color:#4B5563;">Secret / Anon Key (Firebase Test Modunda Boş Bırakabilirsiniz)</span>
          <input type="text" id="supaKeyInput" class="admin-search" placeholder="İsteğe bağlı (Sadece Supabase için zorunlu)" value="${escapeHtml(cloudCfg.anonKey)}" />
        </div>

        <div class="sheet-actions" style="border-color:#E5E7EB;">
          <button type="button" class="admin-btn" id="btnCloseCloudModal">Kapat</button>
          <button type="submit" class="admin-btn primary">Kaydet ve Bağlan</button>
        </div>
      </form>
    </div>
  `;
}

function bindAdminEvents() {
  const searchInput = document.getElementById('adminSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      adminSearchQuery = searchInput.value;
      adminPage = 1;
      renderAdminApp();
      const el = document.getElementById('adminSearchInput');
      if (el) {
        el.focus();
        el.setSelectionRange(el.value.length, el.value.length);
      }
    });
  }

  document.querySelectorAll('[data-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      adminFilterStatus = btn.getAttribute('data-filter');
      adminPage = 1;
      renderAdminApp();
    });
  });

  document.getElementById('btnPrevPage')?.addEventListener('click', () => {
    if (adminPage > 1) {
      adminPage--;
      renderAdminApp();
    }
  });

  document.getElementById('btnNextPage')?.addEventListener('click', () => {
    adminPage++;
    renderAdminApp();
  });

  // Copy NFC link
  document.querySelectorAll('[data-copy-url]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const url = btn.getAttribute('data-copy-url');
      try {
        await navigator.clipboard.writeText(url);
        const orig = btn.textContent;
        btn.textContent = '✓ Kopyalandı';
        setTimeout(() => { btn.textContent = orig; }, 1200);
      } catch (_) {}
    });
  });

  // Open user link in preview
  document.querySelectorAll('[data-open-token]').forEach(btn => {
    btn.addEventListener('click', () => {
      switchToUserToken(btn.getAttribute('data-open-token'));
    });
  });

  // Save inline admin note
  document.querySelectorAll('[data-note-slot]').forEach(input => {
    input.addEventListener('change', async () => {
      const slot = Number(input.getAttribute('data-note-slot'));
      await updateAccountAdminFields(slot, { adminNote: input.value.trim() });
    });
  });

  // Toggle Active / Passive
  document.querySelectorAll('[data-toggle-slot]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const slot = Number(btn.getAttribute('data-toggle-slot'));
      const acc = adminAccounts.find(a => a.slot === slot);
      if (!acc) return;
      const nextStatus = acc.status === 'active' ? 'passive' : 'active';
      await updateAccountAdminFields(slot, { status: nextStatus });
      renderAdminApp();
    });
  });

  // Reset User Account
  document.querySelectorAll('[data-reset-slot]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const slot = Number(btn.getAttribute('data-reset-slot'));
      const ok = window.confirm(`Slot #${String(slot).padStart(4, '0')} hesabını sıfırlamak istediğinize emin misiniz? Kullanıcının mevcut listeleri silinecek ve etiket yeni kullanıcı için sıfırlanacaktır.`);
      if (!ok) return;
      await resetUserAccountByAdmin(slot);
      renderAdminApp();
    });
  });

  // Export all 1,000 links as CSV (Excel compatible UTF-8 BOM)
  document.getElementById('btnExportCsv')?.addEventListener('click', () => {
    const header = 'Slot,Token,NFC_URL,Query_Fallback_URL,Status,Admin_Note,Last_Access,Item_Count\n';
    const rows = adminAccounts.map(a => {
      const noteClean = String(a.adminNote || '').replace(/"/g, '""');
      return `${a.slot},${a.token},${APP_DOMAIN}/${a.token},${APP_DOMAIN}/?u=${a.token},${a.status},"${noteClean}",${a.lastAccessedAt || ''},${a.itemCount || 0}`;
    }).join('\n');

    const blob = new Blob(['\uFEFF' + header + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'thingsyourneed-1000-nfc-links.csv';
    a.click();
    URL.revokeObjectURL(url);
  });

  // Cloud config modal
  document.getElementById('btnCloudConfig')?.addEventListener('click', () => {
    showCloudModal = true;
    renderAdminApp();
  });
  document.getElementById('cloudModalBackdrop')?.addEventListener('click', () => {
    showCloudModal = false;
    renderAdminApp();
  });
  document.getElementById('btnCloseCloudModal')?.addEventListener('click', () => {
    showCloudModal = false;
    renderAdminApp();
  });
  document.getElementById('cloudConfigForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const url = document.getElementById('supaUrlInput')?.value || '';
    const key = document.getElementById('supaKeyInput')?.value || '';
    saveCloudConfig(url, key, Boolean(url));
    showCloudModal = false;
    renderAdminApp();
  });

  // Change Admin Password
  document.getElementById('btnChangeAdminPass')?.addEventListener('click', () => {
    const next = window.prompt('Yeni Admin Şifresini girin:', getAdminPassword());
    if (next && next.trim()) {
      localStorage.setItem(ADMIN_PASS_KEY, next.trim());
      window.alert('Admin şifresi güncellendi.');
    }
  });

  // Logout
  document.getElementById('btnAdminLogout')?.addEventListener('click', () => {
    sessionStorage.removeItem(ADMIN_AUTH_KEY);
    renderAdminApp();
  });
}

// ============================================================================
// PREVIEW / DEMO SWITCHER DOCK (Only shown on localhost or ?demo=1)
// ============================================================================
function safeUpdateUrlQuery(queryStr) {
  try {
    if (window.location.protocol !== 'file:') {
      window.history.pushState({}, '', queryStr);
    } else {
      window.location.hash = queryStr.replace(/^\?/, '');
    }
  } catch (_) {}
}

function isPreviewEnvironment() {
  const host = window.location.hostname;
  const params = new URLSearchParams(window.location.search);
  return (
    window.location.protocol === 'file:' ||
    !host ||
    host === 'localhost' ||
    host === '127.0.0.1' ||
    params.get('demo') === '1'
  );
}

function renderPreviewDock() {
  if (!isPreviewEnvironment()) return '';
  return `
    <div class="preview-dock">
      <span>NFC Test:</span>
      <select id="dockTokenSelect" title="Test farklı NFC etiketleri">
        ${INITIAL_TOKENS.slice(0, 5).map((tok, i) => `
          <option value="${tok}" ${currentMode === 'user' && currentToken === tok ? 'selected' : ''}>
            Etiket #${i + 1} (${tok})
          </option>
        `).join('')}
      </select>
      <button type="button" id="dockSwitchAdmin">
        ${currentMode === 'admin' ? '📱 Kullanıcı Görünümü' : '⚙️ Admin Paneli'}
      </button>
    </div>
  `;
}

function bindPreviewDockEvents() {
  document.getElementById('dockTokenSelect')?.addEventListener('change', (e) => {
    switchToUserToken(e.target.value);
  });
  document.getElementById('dockSwitchAdmin')?.addEventListener('click', () => {
    if (currentMode === 'admin') {
      switchToUserToken(currentToken || INITIAL_TOKENS[0]);
    } else {
      currentMode = 'admin';
      safeUpdateUrlQuery('?admin=1');
      renderAdminApp();
    }
  });
}

async function switchToUserToken(token) {
  currentMode = 'user';
  currentToken = token;
  openStyleForListId = null;
  safeUpdateUrlQuery(`?u=${token}`);
  const session = await loadUserSession(currentToken);
  sessionStatus = session.status;
  userVault = session.vault;
  renderUserApp();
}

// ============================================================================
// INITIALIZE APPLICATION & 3-DAY AUTO-DELETE WATCHER
// ============================================================================
async function boot() {
  await initI18n();
  resolveRoute();

  if (currentMode === 'admin') {
    await renderAdminApp();
  } else {
    const session = await loadUserSession(currentToken);
    sessionStatus = session.status;
    userVault = session.vault;
    renderUserApp();
  }

  // Real-time cross-tab / cloud sync listener
  onSyncMessage(async () => {
    if (currentMode === 'admin') {
      await renderAdminApp();
    } else if (currentMode === 'user' && currentToken) {
      const session = await loadUserSession(currentToken);
      sessionStatus = session.status;
      userVault = session.vault;
      renderUserApp();
    }
  });

  // Background watcher: every 60 seconds, purge any checked item older than 3 days (72h)
  setInterval(async () => {
    if (currentMode === 'user' && userVault && currentToken) {
      const { removedCount } = purgeExpiredCheckedItems(userVault);
      if (removedCount > 0) {
        await saveUserVault(currentToken, userVault);
        renderUserApp();
      }
    }
  }, 60 * 1000);
}

window.addEventListener('popstate', () => {
  boot();
});

boot();


})();
