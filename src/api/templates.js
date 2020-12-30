export default {
	getTemplateInformation (id) {
		switch (id) {
			case "Default":
				return {
					name: "default",
					useIcons: true,
					useText: false,
					iconPrefix: "fa fa-",
					images: [
						"car",
						"bug",
						"paw",
						"bomb",
						"gamepad",
						"diamond",
						"heart",
						"bell"
					],
					folder: ""
				}
			case "Animals":
				return {
					name: "animals",
					useIcons: true,
					useText: false,
					iconPrefix: "fa fa-",
					images: [
						"dog",
						"cat",
						"fish",
						"dove",
						"horse",
						"hippo",
						"frog",
						"spider"
					],
					folder: ""
				}
			case "House":
				return {
					name: "house",
					useIcons: true,
					useText: false,
					iconPrefix: "fa fa-",
					images: [
						"chair",
						"bed",
						"couch",
						"home",
						"building",
						"bath",
						"coffee",
						"door-open"
					],
					folder: ""
				}
			case "Vehicles":
				return {
					name: "vehicles",
					useIcons: true,
					useText: false,
					iconPrefix: "fa fa-",
					images: [
						"car",
						"bicycle",
						"truck",
						"motorcycle",
						"subway",
						"ambulance",
						"helicopter",
						"plane"
					],
					folder: ""
				}
			case "Harry Potter":
				return {
					name: "harry-potter",
					useIcons: false,
					useText: false,
					images: [
						"head",
						"deathly hallows",
						"heart",
						"sorting hat",
						"car",
						"dobby",
						"dumbledore",
						"hogwarts"
					],
					folder: "harry-potter"
				}
			case "Harry Potter Extended":
				return {
					name: "harry-potter",
					useIcons: false,
					useText: false,
					images: [
						"head",
						"deathly hallows",
						"heart",
						"sorting hat",
						"car",
						"dobby",
						"dumbledore",
						"hogwarts",
						// extended
						"hogwarts-emblem",
						"no-good",
						"platform",
						"siluetes",
						"lego",
						"patronum",
						"snitch"
				],
				folder: "harry-potter"
			}
			case "Disney":
				return {
					name: "disney",
					useIcons: false,
					useText: false,
					images: [
						"daisy duck",
						"donald duck",
						"golfos",
						"goofy",
						"mickey",
						"minnie",
						"pluto",
						"scrooge"
					],
					folder: "disney"
				}
			case "Alphabet1":
				return {
					name: "alphabet1",
					useIcons: false,
					useText: true,
					images: [
						"A",
						"B",
						"C",
						"D",
						"E",
						"F",
						"G",
						"H"
					],
					folder: ""
				}
			case "Alphabet2":
				return {
					name: "alphabet2",
					useIcons: false,
					useText: true,
					images: [
						"I",
						"J",
						"K",
						"L",
						"M",
						"N",
						"O",
						"P"
					],
				folder: ""
			}
			case "Alphabet3":
				return {
					name: "alphabet3",
					useIcons: false,
					useText: true,
					images: [
						"Q",
						"R",
						"S",
						"T",
						"U",
						"V",
						"W",
						"X"
					],
				folder: ""
			}
			case "Star Wars":
				return {
					name: "star-wars",
					useIcons: false,
					useText: false,
					images: [
						"death-star",
						"c3po",
						"leia",
						"droid",
						"r2d2",
						"wookie",
						"darth-vader",
						"yoda"
					],
					folder: "star-wars"
				}
			default:
				return []
		}
  }
}
