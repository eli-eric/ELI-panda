export interface CategoryResponse {
    uid: string;
    name: string;
    code: string;
    parentPath: string;
}
export interface CatalogueItemResponse {
    uid: string;
    name: string;
    description: string;
    categoryPath: string;
    categoryName: string;
    manufacturer: string;
    manufacturerUrl: string;
    manufacturerNumber: string;
}

export interface CatalogueItemPagingResponse {
    totalCount: number;
    data: CatalogueItemResponse[]
}

export const AllCategories: Array<CategoryResponse> = [
    {
        "uid": "84372d2b-b7de-4a4f-a0d8-5888ad27a5a0",
        "code": "actuators",
        "name": "Actuators",
        "parentPath": "motion"
    },
    {
        "uid": "56db8fba-6e9a-4bea-8d37-525e7625e848",
        "code": "motorized-actuators",
        "name": "Motorized actuators",
        "parentPath": "motion/actuators"
    },
    {
        "uid": "7b78a4ac-e11b-4fb3-96d1-400b783535e4",
        "code": "cameras",
        "name": "Cameras",
        "parentPath": "beam-characterization"
    },
    {
        "uid": "923fd684-59ea-49d5-ab1e-6299b215504e",
        "code": "wavefront-sensors",
        "name": "Wavefront sensors",
        "parentPath": "beam-characterization"
    },
    {
        "uid": "c0baeda8-c954-4505-9cd1-fd6b025561c6",
        "code": "energy-meters",
        "name": "Energy meters",
        "parentPath": "beam-characterization"
    },
    {
        "uid": "013bcba6-9381-49cf-bf35-ab9aef72ea68",
        "code": "vacuum-pumps",
        "name": "Vacuum pumps",
        "parentPath": "vacuum-technology"
    },
    {
        "uid": "f33c675b-05e4-46d1-93a7-da8f2923220f",
        "code": "turbomolecular-pumps",
        "name": "Turbomolecular pumps",
        "parentPath": "vacuum-technology/vacuum-pumps"
    },
    {
        "uid": "7ba15530-e7ed-463f-821e-2aeda949d131",
        "code": "dry-vacuum-pumps",
        "name": "Dry vacuum pumps",
        "parentPath": "vacuum-technology/vacuum-pumps"
    },
    {
        "uid": "60e00434-db07-432f-98a3-2d91bbe4d71e",
        "code": "cryopumps",
        "name": "Cryopumps",
        "parentPath": "vacuum-technology/vacuum-pumps"
    },
    {
        "uid": "c584bf8b-07e3-4758-8b62-4e05e2307d09",
        "code": "motion",
        "name": "Motion",
        "parentPath": ""
    },
    {
        "uid": "d929ea89-f2f7-4b27-9dbd-1ba552f11a06",
        "code": "beam-characterization",
        "name": "Beam characterization",
        "parentPath": ""
    },
    {
        "uid": "62df85f8-83fb-4be6-9b8b-45a3d5fcd917",
        "code": "vacuum-technology",
        "name": "Vacuum Technology",
        "parentPath": ""
    }
]


export const AllCatalogueItems: Array<CatalogueItemResponse> = [

    {
        uid: "c664c559-650d-4733-90fe-74cef6c04186",
        name: "Basler acA1440-73gm",
        description: "The Basler acA1440-73gm GigE camera with the Sony IMX273 CMOS sensor delivers 73 frames per second at 1.6 MP resolution.",
        categoryName: "Cameras",
        categoryPath: "beam-characterization/cameras",
        manufacturer: "Basler",
        manufacturerUrl: "https:\/\/www.baslerweb.com\/en\/products\/cameras\/area-scan-cameras\/ace\/aca1440-73gm\/",
        manufacturerNumber: "acA1440-73gm"
    },
    {
        uid: "7a2fdc9f-b1bc-4570-ad9a-9921570db75c",
        name: "Basler acA1920-50gm",
        description: "The Basler acA1920-50gm GigE camera with the Sony IMX174 CMOS sensor delivers 50 frames per second at 2.3 MP resolution.",
        categoryName: "Cameras",
        categoryPath: "beam-characterization/cameras",
        manufacturer: "Basler",
        manufacturerUrl: "https:\/\/www.baslerweb.com\/en\/products\/cameras\/area-scan-cameras\/ace\/aca1920-50gm\/",
        manufacturerNumber: "acA1920-50gm"
    },
    {
        uid: "8e2b7f8e-c689-414c-b75d-9b3489e0ffaa",
        name: "Basler acA2040-35gm",
        description: "The Basler acA2040-35gm GigE camera with the Sony IMX265 CMOS sensor delivers 36 frames per second at 3.2 MP Resolution.",
        categoryName: "Cameras",
        categoryPath: "beam-characterization/cameras",
        manufacturer: "Basler",
        manufacturerUrl: "https:\/\/www.baslerweb.com\/en\/products\/cameras\/area-scan-cameras\/ace\/aca2040-35gm\/",
        manufacturerNumber: "acA2040-35gm"
    },
    {
        uid: "972e871c-2b1e-4bbf-bdd6-3a87a5a03873",
        name: "BFLY-PGE-12A2M-CS",
        description: "The Blackfly® camera line combines Sony CCD, Aptina, e2v, and Sharp sensors with a host of unique features. For FLIR area scan cameras with the latest sensors and most advanced feature sets, please refer to our Blackfly S and Oryx camera families.",
        categoryName: "Cameras",
        categoryPath: "beam-characterization/cameras",
        manufacturer: "Flir",
        manufacturerUrl: "https:\/\/www.flir.com\/products\/blackfly-gige\/?model=BFLY-PGE-12A2M-CS",
        manufacturerNumber: "BFLY-PGE-12A2M-CS"
    },
    {
        uid: "2ad05ed4-2f4d-434f-bbb5-84407b482172",
        name: "BFLY-PGE-31S4M-C",
        description: "Model: BFLY-PGE-31S4M-C: 3.2 MP, 35 FPS, Sony IMX265, Mono",
        categoryName: "Cameras",
        categoryPath: "beam-characterization/cameras",
        manufacturer: "Flir",
        manufacturerUrl: "https:\/\/www.flir.eu\/products\/blackfly-gige\/?model=BFLY-PGE-31S4M-C",
        manufacturerNumber: "BFLY-PGE-31S4M-C"
    },
    {
        uid: "10bdc2f4-e2c9-462d-8b61-ef9827655e03",
        name: "AXIS M1014",
        description: "",
        categoryName: "Cameras",
        categoryPath: "beam-characterization/cameras",
        manufacturer: "AXIS",
        manufacturerUrl: "https:\/\/www.axis.com\/products\/axis-m1014\/support",
        manufacturerNumber: "AXIS M1014"
    },
    {
        uid: "f1ddf727-786b-471c-b688-63010f0a37b4",
        name: "AXIS M1045-LW",
        description: "",
        categoryName: "Cameras",
        categoryPath: "beam-characterization/cameras",
        manufacturer: "AXIS",
        manufacturerUrl: "https:\/\/www.axis.com\/products\/axis-m1045-lw",
        manufacturerNumber: "AXIS M1045-LW"
    },
    {
        uid: "4a43593f-a10e-4998-85fe-82067160f4a4",
        name: "Andor Newton DU920P-BN",
        description: "The high-end USB 2.0 Newton CCD series brings together Andor’s ultra fast, low-noise electronics platform and market-leading deep thermo-electric cooling to -100°C, complemented by Andor’s UltravacTM technology with its un-matched reliability track record in the scientific and industrial communities",
        categoryName: "Cameras",
        categoryPath: "beam-characterization/cameras",
        manufacturer: "Andor Oxford Instruments",
        manufacturerUrl: "https:\/\/andor.oxinst.com\/products\/newton-ccd-and-emccd-cameras\/newton-920",
        manufacturerNumber: "Andor Newton DU920P-BN"
    },
    {
        uid: "a62b3578-d38b-4d62-9add-f53e7243d1a4",
        name: "Grasshopper3 GS3-PGE-23S6M",
        description: "Model: GS3-PGE-23S6M-C: 2.3 MP, 48 FPS, Sony IMX174, Mono",
        categoryName: "Cameras",
        categoryPath: "beam-characterization/cameras",
        manufacturer: "Flir",
        manufacturerUrl: "https:\/\/www.flir.eu\/products\/grasshopper3-gige\/?model=GS3-PGE-23S6M-C",
        manufacturerNumber: "GS3-PGE-23S6M-C"
    },
    {
        uid: "8c6f854e-4e63-4c3d-89ad-7c2bf492f07a",
        name: "Thorlabs, BC106-VIS",
        description: "",
        categoryName: "Cameras",
        categoryPath: "beam-characterization/cameras",
        manufacturer: "Thorlabs",
        manufacturerUrl: "https:\/\/www.thorlabs.com\/thorproduct.cfm?partnumber=BC106-VIS",
        manufacturerNumber: "BC106-VIS"
    },
    {
        uid: "491a13da-b453-4008-9e23-2d238d1b0d82",
        name: "iDS UI-3060",
        description: "The UI-3060CP with Sony's 2.3 MP sensor IMX174 (1936 x 1216 px) sets a new standard in terms of light sensitivity, dynamic range and color reproduction.",
        categoryName: "Cameras",
        categoryPath: "beam-characterization/cameras",
        manufacturer: "iDS",
        manufacturerUrl: "https:\/\/en.ids-imaging.com\/store\/ui-3060cp-rev-2.html",
        manufacturerNumber: "UI-3060CP"
    },
    {
        uid: "ccf9c3f4-2bfc-455d-b4ae-7cc9d39110bc",
        name: "Bobcat B0610",
        description: "The B0610 is an advanced high-speed progressive scan, fully programmable CCD camera designed for imaging applications that require high quality images with powerful features and flexibility.\nThe camera has a small size, light weight, and is built around the TRUESENSE KAI-0340S Interline Transfer CCD image sensor which provides an image resolution of 640 x 480 and delivers up to 136 frames per second with a 1\/3\" optical format. B0610 is available with Camera Link® Base (PoCL), GigE Vision®, PoE and CoaXPress output.",
        categoryName: "Cameras",
        categoryPath: "beam-characterization/cameras",
        manufacturer: "Imperx",
        manufacturerUrl: "https:\/\/www.imperx.com\/ccd-cameras\/b0610\/",
        manufacturerNumber: "B0610"
    },
    {
        uid: "c0c6360a-76fc-4b89-ad71-3e0d1de6f3dd",
        name: "IDS UI-1252LE",
        description: "The UI-1252LE with the e2v CMOS sensor with 2 megapixel resolution is an especially high-performance and versatile industrial camera (EV76C570). It has one of the most sensitive sensors in the IDS product portfolio and it is available in monochrome and color versions. Besides its outstanding sensitivity to light in CCD quality, the camera also has a range of other distinctive features: The sensor allows you to switch between various shutter modes, which allow you to capture sharp images of moving objects or extremely low-noise, high-contrast images.",
        categoryName: "Cameras",
        categoryPath: "beam-characterization/cameras",
        manufacturer: "iDS",
        manufacturerUrl: "https:\/\/en.ids-imaging.com\/store\/ui-1252le.html",
        manufacturerNumber: "UI-1252LE-M:AB00336"
    },
    {
        uid: "514eb545-0a6f-4c25-8895-ce8373337a1d",
        name: "Manta G-125B\/C",
        description: "Manta is Allied Vision’s most versatile GigE Vision camera series. It provides the largest choice of image sensors and its advanced feature set simplifies the setup of multi-camera applications. With its modular hardware concept, Manta offers nearly endless configuration possibilities to adapt the camera to your application.",
        categoryName: "Cameras",
        categoryPath: "beam-characterization/cameras",
        manufacturer: "Allied Vision Technologies",
        manufacturerUrl: "https:\/\/www.alliedvision.com\/en\/camera-selector\/detail\/manta\/g-125\/",
        manufacturerNumber: "G-125B\/C"
    },
    {
        uid: "a676dbd2-ca89-4cc0-af02-6038eaef54ea",
        name: "Andor iKon-L SO",
        description: "Andor's iKon-L SO is a revolutionary large area CCD platform, offering back illuminated (/ 90% QE) full frame sensors up to 4MPixel(2k x 2k), 1 MHz readoutand unparalleled priority TE cooling down to –100°C.",
        categoryName: "Cameras",
        categoryPath: "beam-characterization/cameras",
        manufacturer: "Andor Oxford Instruments",
        manufacturerUrl: "https:\/\/andor.oxinst.com\/products\/high-energy-detection\/ikon-l-so",
        manufacturerNumber: "iKon-L SO"
    },
    {
        uid: "27a015cd-8bd2-42ce-b343-a10ad69f0341",
        name: "Basler acA1600-20gm",
        description: "The Basler  GigE camera with the Sony  ICX274 CMOS sensor delivers 20 frames per second at 2 MP resolution.",
        categoryName: "Cameras",
        categoryPath: "beam-characterization/cameras",
        manufacturer: "Basler",
        manufacturerUrl: "https:\/\/www.baslerweb.com\/en\/service\/search\/?q=acA1600-20gm",
        manufacturerNumber: "acA1600-20gm"
    },
    {
        uid: "ec6e2c8e-9057-46e5-9c6b-6d9affdda89c",
        name: "Basler acA3800-10gc",
        description: "The Basler acA3800-10gc GigE camera with the ON Semiconductor MT9J003 CMOS sensor delivers 10 frames per second at 10 MP resolution.",
        categoryName: "Cameras",
        categoryPath: "beam-characterization/cameras",
        manufacturer: "Basler",
        manufacturerUrl: "https:\/\/www.baslerweb.com\/en\/products\/cameras\/area-scan-cameras\/ace\/aca3800-10gc\/",
        manufacturerNumber: "acA3800-10gc"
    },
    {
        uid: "77650599-6835-4545-aabe-dd2a8321947f",
        name: "Basler acA2440-20gm",
        description: "The Basler acA2440-20gm GigE camera with the Sony IMX264 CMOS sensor delivers 23 frames per second at 5.0 MP Resolution.",
        categoryName: "Cameras",
        categoryPath: "beam-characterization/cameras",
        manufacturer: "Basler",
        manufacturerUrl: "https:\/\/www.baslerweb.com\/en\/products\/cameras\/area-scan-cameras\/ace\/aca2440-20gm\/",
        manufacturerNumber: "acA2440-20gm"
    },
    {
        uid: "e79758ec-bced-4bcc-9853-83c950414cba",
        name: "Basler acA2000-50gc",
        description: "The Basler acA2000-50gc (CS-Mount) GigE camera with the ams CMV2000 CMOS sensor delivers 50 frames per second at 2 MP resolution.",
        categoryName: "Cameras",
        categoryPath: "beam-characterization/cameras",
        manufacturer: "Basler",
        manufacturerUrl: "https:\/\/www.baslerweb.com\/en\/products\/cameras\/area-scan-cameras\/ace\/aca2000-50gc-cs-mount\/",
        manufacturerNumber: "acA2000-50gc"
    },
    {
        uid: "6b9923a7-a783-46ee-a312-ce075df71d7e",
        name: "Basler acA2000-50gm",
        description: "The Basler acA2000-50gm GigE camera with the ams CMV2000 CMOS sensor delivers 50 frames per second at 2 MP resolution.",
        categoryName: "Cameras",
        categoryPath: "beam-characterization/cameras",
        manufacturer: "Basler",
        manufacturerUrl: "https:\/\/www.baslerweb.com\/en\/products\/cameras\/area-scan-cameras\/ace\/aca2000-50gm\/",
        manufacturerNumber: "acA2000-50gm"
    },
    {
        uid: "994f02c5-08c6-4c22-b0a6-0bcf67c94918",
        name: "Basler acA1920-48gm",
        description: "The Basler acA1920-48gm GigE camera with the ON Semiconductor PYTHON 2000 CMOS sensor delivers 50 frames per second at 2.3 MP resolution.",
        categoryName: "Cameras",
        categoryPath: "beam-characterization/cameras",
        manufacturer: "Basler",
        manufacturerUrl: "https:\/\/www.baslerweb.com\/en\/products\/cameras\/area-scan-cameras\/ace\/aca1920-48gm\/",
        manufacturerNumber: "acA1920-48gm"
    },
    {
        uid: "16aefe0b-cbc2-4c16-b6bf-39dbc97b0ca7",
        name: "Basler acA720-290gm",
        description: "The Basler acA720-290gm GigE camera with the Sony IMX287 CMOS sensor delivers 291 frames per second at VGA resolution.",
        categoryName: "Cameras",
        categoryPath: "beam-characterization/cameras",
        manufacturer: "Basler",
        manufacturerUrl: "https:\/\/www.baslerweb.com\/en\/products\/cameras\/area-scan-cameras\/ace\/aca720-290gm\/",
        manufacturerNumber: "acA720-290gm"
    },
    {
        uid: "86ecb6eb-0383-4373-a5e8-eda08e2ab2e2",
        name: "Basler acA5472-5gm",
        description: "The Basler acA5472-5gm GigE camera with the Sony IMX183 CMOS sensor delivers 5 frames per second at 20.0 MP Resolution.",
        categoryName: "Cameras",
        categoryPath: "beam-characterization/cameras",
        manufacturer: "Basler",
        manufacturerUrl: "https:\/\/www.baslerweb.com\/en\/products\/cameras\/area-scan-cameras\/ace\/aca5472-5gm\/",
        manufacturerNumber: "acA5472-5gm"
    },
    {
        uid: "94f7a3f6-1704-43d8-88ed-c9329b3f957b",
        name: "Basler acA2500-20gm",
        description: "The Basler acA2500-20gm GigE camera with the ON Semiconductor PYTHON 5000 CMOS sensor delivers 21 frames per second at 5 MP resolution.",
        categoryName: "Cameras",
        categoryPath: "beam-characterization/cameras",
        manufacturer: "Basler",
        manufacturerUrl: "https:\/\/www.baslerweb.com\/en\/products\/cameras\/area-scan-cameras\/ace\/aca2500-20gm\/",
        manufacturerNumber: "acA2500-20gm"
    },
    {
        uid: "263f736d-62f2-478f-9360-d0cebe298f48",
        name: "Basler acA1920-40um",
        description: "The Basler acA1920-40um USB 3.0 camera with the Sony IMX249 CMOS sensor delivers 41 frames per second at 2.3 MP resolution.",
        categoryName: "Cameras",
        categoryPath: "beam-characterization/cameras",
        manufacturer: "Basler",
        manufacturerUrl: "https:\/\/www.baslerweb.com\/en\/products\/cameras\/area-scan-cameras\/ace\/aca1920-40um\/",
        manufacturerNumber: "acA1920-40um"
    },
    {
        uid: "cc0b56f7-a9bc-45d5-8433-bbdfe774406c",
        name: "Basler acA2440-20gc",
        description: "The Basler acA2440-20gc GigE camera with the Sony IMX264 CMOS sensor delivers 23 frames per second at 5.0 MP Resolution.",
        categoryName: "Cameras",
        categoryPath: "beam-characterization/cameras",
        manufacturer: "Basler",
        manufacturerUrl: "https:\/\/www.baslerweb.com\/en\/products\/cameras\/area-scan-cameras\/ace\/aca2440-20gc\/",
        manufacturerNumber: "acA2440-20gc"
    },
    {
        uid: "09fd0541-1e77-4a0e-ad37-e6be1e3372f9",
        name: "Basler daA2500-14um",
        description: "The Basler daA2500-14um (S-Mount) USB 3.0 camera with the ON Semiconductor MT9P031 CMOS sensor delivers 14 frames per second at 5 MP resolution. This model comes with a S-mount.",
        categoryName: "Cameras",
        categoryPath: "beam-characterization/cameras",
        manufacturer: "Basler",
        manufacturerUrl: "https:\/\/www.baslerweb.com\/en\/products\/cameras\/area-scan-cameras\/dart\/daa2500-14um-s-mount\/",
        manufacturerNumber: "daA2500-14um"
    },
    {
        uid: "e6f90773-80cc-40be-a2cf-3dea588f91c1",
        name: "Basler acA2040-35gc",
        description: "The Basler acA2040-35gc GigE camera with the Sony IMX265 CMOS sensor delivers 36 frames per second at 3.2 MP Resolution.",
        categoryName: "Cameras",
        categoryPath: "beam-characterization/cameras",
        manufacturer: "Basler",
        manufacturerUrl: "https:\/\/www.baslerweb.com\/en\/products\/cameras\/area-scan-cameras\/ace\/aca2040-35gc\/",
        manufacturerNumber: "acA2040-35gc"
    },
    {
        uid: "d27bb354-5543-41b2-a773-a53742242daa",
        name: "Basler acA2040-25gm",
        description: "The Basler acA2040-25gm GigE camera with the ams CMV4000 CMOS sensor delivers 25 frames per second at 4 MP resolution.",
        categoryName: "Cameras",
        categoryPath: "beam-characterization/cameras",
        manufacturer: "Basler",
        manufacturerUrl: "https:\/\/www.baslerweb.com\/en\/products\/cameras\/area-scan-cameras\/ace\/aca2040-35gc\/",
        manufacturerNumber: "acA2040-25gm"
    },
    {
        uid: "0a0603d8-1d33-463c-8351-96306dec80b8",
        name: "Basler acA3800-10gm",
        description: "he Basler acA3800-10gm GigE camera with the ON Semiconductor MT9J003 CMOS sensor delivers 10 frames per second at 10 MP resolution.",
        categoryName: "Cameras",
        categoryPath: "beam-characterization/cameras",
        manufacturer: "Basler",
        manufacturerUrl: "https:\/\/www.baslerweb.com\/en\/products\/cameras\/area-scan-cameras\/ace\/aca3800-10gm\/",
        manufacturerNumber: "acA3800-10gm"
    },
    {
        uid: "7e479009-90d0-4606-9b96-777a521915a5",
        name: "AXIS-PX",
        description: "AXIS-PX is the only commercial x-ray streak camera that can streak 450 spatial resolution points (18 mm slit) with a time resolution of 700 fs (measured at FWHM).",
        categoryName: "Cameras",
        categoryPath: "beam-characterization/cameras",
        manufacturer: "AXIS",
        manufacturerUrl: "https:\/\/www.axis-photon.com\/streak-camera\/axis-px-subpicosecond-x-ray-streak-camera\/",
        manufacturerNumber: "AXIS-PX"
    },
    {
        uid: "a194f926-754f-4496-9bde-daa30bca5eee",
        name: "Manta G-507B",
        description: "Allied Vision Manta G-507B Monochrome CMOS PoE Camera",
        categoryName: "Cameras",
        categoryPath: "beam-characterization/cameras",
        manufacturer: "Allied Vision Technologies",
        manufacturerUrl: "https:\/\/www.edmundoptics.com\/p\/allied-vision-manta-g-507b-monochrome-cmos-poe-camera\/40123\/",
        manufacturerNumber: "G-507B"
    },
    {
        uid: "e07ddbb1-8307-49f3-b128-18428b412d1e",
        name: "Manta G-319B",
        description: "Allied Vision Manta G-319B Monochrome CMOS PoE Camera",
        categoryName: "Cameras",
        categoryPath: "beam-characterization/cameras",
        manufacturer: "Allied Vision Technologies",
        manufacturerUrl: "https:\/\/www.edmundoptics.com\/p\/allied-vision-manta-g-319b-monochrome-cmos-poe-camera\/40121\/",
        manufacturerNumber: "G-319B"
    },
    {
        uid: "0bad6bbb-fb79-4274-8981-af631908100b",
        name: "Manta G-235B",
        description: "Modular machine vision camera with GigE Vision interface",
        categoryName: "Cameras",
        categoryPath: "beam-characterization/cameras",
        manufacturer: "Allied Vision Technologies",
        manufacturerUrl: "https:\/\/www.alliedvision.com\/en\/camera-selector\/detail\/manta\/g-235\/",
        manufacturerNumber: "G-235B"
    },
    {
        uid: "5c30f7e4-01e9-400d-a34b-f299813c6ee4",
        name: "Manta G-125B",
        description: "Modular machine vision camera with GigE Vision interface",
        categoryName: "Cameras",
        categoryPath: "beam-characterization/cameras",
        manufacturer: "Allied Vision Technologies",
        manufacturerUrl: "https:\/\/www.alliedvision.com\/en\/camera-selector\/detail\/manta\/g-125\/",
        manufacturerNumber: "G-125B"
    },
    {
        uid: "a84de776-78da-47ec-a933-ac19f6d52f31",
        name: "Guppy PRO F-503",
        description: "Ultra-compact industrial camera with IEEE 1394b interface",
        categoryName: "Cameras",
        categoryPath: "beam-characterization/cameras",
        manufacturer: "Allied Vision Technologies",
        manufacturerUrl: "https:\/\/www.alliedvision.com\/en\/camera-selector\/detail\/guppy-pro\/f-503\/",
        manufacturerNumber: "Guppy PRO F-503"
    },
    {
        uid: "ebcb1308-cf3c-4173-9ff5-d7378f082d6d",
        name: "Lucid Vision Labs Phoenix PHX200S-MC",
        description: "Lucid Vision Labs Phoenix™ PHX200S-MC, Sony IMX183, 20.0 MP, Monochrome Camera",
        categoryName: "Cameras",
        categoryPath: "beam-characterization/cameras",
        manufacturer: "Lucid Vision Labs",
        manufacturerUrl: "https:\/\/www.edmundoptics.com\/p\/phoenixt-phx200s-1-monochrome-gige-camera\/40104\/",
        manufacturerNumber: "PHX200S-CC"
    },
    {
        uid: "22ddb705-da59-4ab7-9344-b87e5ce0127b",
        name: "Lucid Vision Labs Phoenix PHX200S-CC",
        description: "Lucid Vision Labs Phoenix™ PHX200S-CC, Sony IMX183, 20.0 MP, Color Camera",
        categoryName: "Cameras",
        categoryPath: "beam-characterization/cameras",
        manufacturer: "Lucid Vision Labs",
        manufacturerUrl: "https:\/\/www.edmundoptics.com\/p\/phoenixt-phx200s-1-color-gige-camera\/40105\/",
        manufacturerNumber: "PHX200S-MC"
    },
    {
        uid: "84edfd76-9e2b-4445-8d96-884aa0632773",
        name: "Lucid Vision Labs Phoenix PHX032S-CC",
        description: "Lucid Vision Labs Phoenix™ PHX032S-CC, Sony IMX265, 3.2 MP, Color Camera",
        categoryName: "Cameras",
        categoryPath: "beam-characterization/cameras",
        manufacturer: "Lucid Vision Labs",
        manufacturerUrl: "https:\/\/www.edmundoptics.com\/p\/phoenixt-phx032s-118-color-gige-camera\/40099\/",
        manufacturerNumber: "PHX032S-CC"
    },
    {
        uid: "ba7a1dea-779b-4b0e-831e-e033484dde71",
        name: "HR-2000-M with AMS CMV2000",
        description: "HR-2000 features the CMV2000 CMOS sensor by AMS. Benefits include high dynamic range, and high frame rate. At full resolution (2048×1088) you get 338 frames per second. The HR-2000 offers multi-camera synchronization at <1µs, low CPU overhead, excellent price-performance ratio, and fiber cable lengths from 1M to 10KM without the need of fiber converters or repeaters. A near-infrared option is available for this model.",
        categoryName: "Cameras",
        categoryPath: "beam-characterization/cameras",
        manufacturer: "Emergent Vision Technologies",
        manufacturerUrl: "https:\/\/emergentvisiontec.com\/products\/area-scan-cameras\/10-gige-area-scan-cameras-hr-series\/hr-2000\/",
        manufacturerNumber: "HR-2000-M"
    },
    {
        uid: "e68ce4d4-9ab4-4272-bb3c-2bbf6a327f33",
        name: "Oryx ORX-10GS-51S5M-C Mono 10GigE",
        description: "Oryx® ORX-10GS-51S5M-C Mono 10GigE",
        categoryName: "Cameras",
        categoryPath: "beam-characterization/cameras",
        manufacturer: "Flir",
        manufacturerUrl: "https:\/\/www.edmundoptics.com\/p\/oryxr-orx-10gs-51s5m-c-mono-10gige\/46574\/",
        manufacturerNumber: "ORX-10GS-51S5M-C"
    },
    {
        uid: "02135c3b-b4e7-43fd-87b2-c7a89874f4c1",
        name: "Infrared camera Fluke Ti300",
        description: "",
        categoryName: "Cameras",
        categoryPath: "beam-characterization/cameras",
        manufacturer: "Fluke",
        manufacturerUrl: "https:\/\/www.fluke.com\/cs-cz\/produkt\/termokamery\/ti300",
        manufacturerNumber: "Fluke Ti300"
    },
    {
        uid: "a1222a94-c1be-4696-b027-390770529b83",
        name: "GE 1024 1024 BI MID",
        description: "Scientific & Industrial Camera",
        categoryName: "Cameras",
        categoryPath: "beam-characterization/cameras",
        manufacturer: "Greateyes",
        manufacturerUrl: "https:\/\/www.gophotonics.com\/products\/scientific-industrial-cameras\/greateyes-gmbh\/45-638-ge-1024-1024-bi-mid",
        manufacturerNumber: "GE 1024 1024 BI MID"
    },
    {
        uid: "b001709a-5b58-49ba-9147-0ae6ea6205b4",
        name: "UI-1480SE",
        description: "The UI-1480SE is fitted with the 4.92 megapixel CMOS sensor (MT9P031STM). About half an inch in size, the sensor delivers a resolution of 2560 x 1920 pixels as well as rolling and global start shutter features. The sensor is extraordinarily sensitive and is a real megapixel CCD replacement. The various shutter modes provide ideal parameters for every application to produce sharp, low-noise images.",
        categoryName: "Cameras",
        categoryPath: "beam-characterization/cameras",
        manufacturer: "iDS",
        manufacturerUrl: "https:\/\/en.ids-imaging.com\/store\/ui-1480se.html",
        manufacturerNumber: "UI-1480SE"
    },
    {
        uid: "e315ba87-70e7-462a-b544-a299884405a9",
        name: "UI-1240SE",
        description: "The UI-1240SE is a particularly powerful industrial camera with the e2v 1.3 megapixel CMOS sensor. This is one of the most sensitive sensors in the IDS product portfolio and it is available in monochrome, color (EV76C560ABT\/EV76C560ACT), and NIR versions (EV76C661ABT). Besides its outstanding sensitivity to light in CCD quality, the camera also has a range of other distinctive features: For example, the sensor provides two global shutter and two rolling shutter modes, which you can switch between while the camera is in operation..",
        categoryName: "Cameras",
        categoryPath: "beam-characterization/cameras",
        manufacturer: "iDS",
        manufacturerUrl: "https:\/\/en.ids-imaging.com\/store\/ui-1240se.html",
        manufacturerNumber: "UI-1240SE-NIR-GL"
    },
    {
        uid: "0027c9c2-7617-480f-af3e-ee542661a0a5",
        name: "Iron CXP 250 -Sony Pregius IMX250",
        description: "CoaXPress 12G rugged camera",
        categoryName: "Cameras",
        categoryPath: "beam-characterization/cameras",
        manufacturer: "Kaya Instruments",
        manufacturerUrl: "https:\/\/kayacameras.com\/product\/iron-coaxpress-250-camera\/",
        manufacturerNumber: "Iron CXP 250"
    },
    {
        uid: "b708331a-6e36-44b8-90f4-5eff50eb10da",
        name: "Mako G-503B",
        description: "Mako G-503 with ON Semi MT9P031 \/ MT9P006 runs 14.0 frames per second at 5.0 MP resolution.",
        categoryName: "Cameras",
        categoryPath: "beam-characterization/cameras",
        manufacturer: "Allied Vision Technologies",
        manufacturerUrl: "https:\/\/www.alliedvision.com\/en\/camera-selector\/detail\/mako\/g-503\/",
        manufacturerNumber: "Mako G-503B"
    },
    {
        uid: "97917d07-2333-475b-9846-50f6a0307271",
        name: "SP920G GigE Silicon CCD High Resolution Camera",
        description: "High Resolution Beam Profiling Camera With GigE Interface For High-Speed Applications: SP920G",
        categoryName: "Cameras",
        categoryPath: "beam-characterization/cameras",
        manufacturer: "Ophir",
        manufacturerUrl: "https:\/\/www.meddeviceonline.com\/doc\/high-resolution-beam-profiling-camera-with-gige-interface-for-high-speed-applications-sp920g-0001",
        manufacturerNumber: "SP920G"
    },
    {
        uid: "e8cceb37-2278-4188-88c8-532ac1612505",
        name: "TACHYON 16k CAMERA",
        description: "Uncooled MWIR 128×128 pixels infrared camera with high-speed frame rates (4,000 fps max)",
        categoryName: "Cameras",
        categoryPath: "beam-characterization/cameras",
        manufacturer: "NIT",
        manufacturerUrl: "https:\/\/www.niteurope.com\/en\/tachyon-16k\/",
        manufacturerNumber: "TACHYON 16k"
    },
    {
        uid: "1938bc37-d3c4-4546-94cb-be8fbbeede2c",
        name: "CS2100M-USB",
        description: "CS2100M-USB - Quantalux 2.1 MP Monochrome sCMOS Camera, Passively Cooled Compact Package, 1\/4\"-20 Taps",
        categoryName: "Cameras",
        categoryPath: "beam-characterization/cameras",
        manufacturer: "Thorlabs",
        manufacturerUrl: "https:\/\/www.thorlabs.com\/thorproduct.cfm?partnumber=CS2100M-USB",
        manufacturerNumber: "CS2100M-USB"
    },
    {
        uid: "f1073be3-eae3-4d90-b705-d13a8f1762c9",
        name: "Andor’s Zyla 4.29-USB3-W",
        description: "4.2 MP; Pixel Size 6.5x6.5 μm; Sensor Size 13.3x13.3 mm; 100 fps (53 fps USB 3.0); 12, 16 bit; USB 3.0, Camera Link 10-tap; Read Noise 0.9 e-; Peak QE 82%; 33,000:1 Dynamic Range",
        categoryName: "Cameras",
        categoryPath: "beam-characterization/cameras",
        manufacturer: "Andor Oxford Instruments",
        manufacturerUrl: "https:\/\/www.amstechnologies-webshop.com\/zyla-4.2-scmos-cameras-andor-technology-sw11180",
        manufacturerNumber: "ZYLA-4.2"
    },
    {
        uid: "35197fd9-2bd4-46a9-851b-8a367d44cc56",
        name: "Prime 95B",
        description: "Outperforming EMCCD cameras, the Prime 95B Scientific CMOS (sCMOS) camera series includes several back illuminated sCMOS cameras that offer 95% QE with extreme sensitivity and high frame rates.",
        categoryName: "Cameras",
        categoryPath: "beam-characterization/cameras",
        manufacturer: "Teledyne Photometrics",
        manufacturerUrl: "https:\/\/www.photometrics.com\/products\/prime-family\/prime95b",
        manufacturerNumber: "Prime 95B"
    },
    {
        uid: "0e5f7ee6-fe00-4e55-b404-1e1c1b9d0ec1",
        name: "PI-MTE3 2048B",
        description: "Large format, fully in-vacuum CCD cameras, offering flexible detector orientation and proximity to sample through sensor and camera design. With back-illumination technology, the PI-MTE3 delivers /95% peak quantum efficiency over the ~10 eV to 30 keV energy range. Efficient liquid cooling offers low dark current, facilitating long exposure times, with the four-port readout architecture offering 7-10x higher frame rates than previous generation two-port cameras.",
        categoryName: "Cameras",
        categoryPath: "beam-characterization/cameras",
        manufacturer: "Teledyne Princeton Instruments",
        manufacturerUrl: "https:\/\/www.princetoninstruments.com\/products\/pi-mte-family\/pi-mte",
        manufacturerNumber: "MTE3 2048B"
    },
    {
        uid: "acba26a5-8ae7-41a7-846f-4e89fc479a75",
        name: "GC1621MP",
        description: "",
        categoryName: "Cameras",
        categoryPath: "beam-characterization/cameras",
        manufacturer: "Smartek Vision",
        manufacturerUrl: "http:\/\/www.rocketech.cc\/doc\/smartek\/Giganetix%20Standard%20Series.pdf",
        manufacturerNumber: "GC1621MP"
    },
    {
        uid: "e29fc526-14a8-480d-ae9d-972b3cc5cee6",
        name: "MC023MG-SY",
        description: "2.3 MP Monochrome Sony CMOS Pregius™ Camera with USB 3.1 interface",
        categoryName: "Cameras",
        categoryPath: "beam-characterization/cameras",
        manufacturer: "Ximea",
        manufacturerUrl: "https:\/\/www.ximea.com\/en\/products\/usb-31-gen-1-with-sony-cmos-xic\/mc023mg-sy",
        manufacturerNumber: "MC023MG-SY"
    },
    {
        uid: "e145eb80-42d6-458a-be8b-3001f5b3b1a8",
        name: "SID4-HR",
        description: "The SID4-HR brings ultra-high phase sampling (400 x 300) and high dynamic range (500 µm PV) to the most demanding wavefront measurement applications. Its large aperture and extreme wavefront sensitivity makes it perfectly suited to direct measurement of large diverging beams without relay optics.",
        categoryName: "Wavefront sensors",
        categoryPath: "beam-characterization/wavefront-sensors",
        manufacturer: "Phasics",
        manufacturerUrl: "https:\/\/www.phasics.com\/en\/product\/sid4-hr-wavefront-sensor\/",
        manufacturerNumber: "SID4-HR"
    },
    {
        uid: "1d97e1b8-08d0-4ab3-ac3b-4b80f39a2e0e",
        name: "SID4",
        description: "Our entry-level yet high-resolution wavefront sensor covering the visible and NIR range, the SID4 is the perfect versatile tool for any laser or optical metrology application",
        categoryName: "Wavefront sensors",
        categoryPath: "beam-characterization/wavefront-sensors",
        manufacturer: "Phasics",
        manufacturerUrl: "https:\/\/www.phasics.com\/en\/product\/sid4-wavefront-sensor\/",
        manufacturerNumber: "SID4"
    },
    {
        uid: "c8db5d3f-5a8f-4708-be6d-eab62a007f4f",
        name: "SHSLab AR-110-GE-PRO (central wavelength 820 nm)",
        description: "The all-purpose tool for testing optics and laser beams. Made up of the sensor head SHSCam and Optocraft’s powerful evaluation software SHSWorks.",
        categoryName: "Wavefront sensors",
        categoryPath: "beam-characterization/wavefront-sensors",
        manufacturer: "Optocraft",
        manufacturerUrl: "https:\/\/www.optocraft.de\/en\/shslab\/",
        manufacturerNumber: "obsolete"
    },
    {
        uid: "460f8b15-80ec-4fd5-89b5-59a4a4c0e201",
        name: "SHSLab AR-110-GE-PRO (central wavelength 410 nm)",
        description: "The all-purpose tool for testing optics and laser beams. Made up of the sensor head SHSCam and Optocraft’s powerful evaluation software SHSWorks.",
        categoryName: "Wavefront sensors",
        categoryPath: "beam-characterization/wavefront-sensors",
        manufacturer: "Optocraft",
        manufacturerUrl: "https:\/\/www.optocraft.de\/en\/shslab\/",
        manufacturerNumber: "obsolete"
    },
    {
        uid: "80ea4fa7-a9b6-44ce-9bb4-db72b681a7ac",
        name: "SHSCam BR-130-GE",
        description: "The all-purpose tool for testing optics and laser beams. Made up of the sensor head SHSCam and Optocraft’s powerful evaluation software SHSWorks.",
        categoryName: "Wavefront sensors",
        categoryPath: "beam-characterization/wavefront-sensors",
        manufacturer: "Optocraft",
        manufacturerUrl: "https:\/\/www.optocraft.de\/en\/shslab\/",
        manufacturerNumber: "obsolete"
    },
    {
        uid: "0056ed5a-e20b-4c15-b8c6-2312c23b1f4a",
        name: "QE25LP-S-MB-D0",
        description: "Pyroelectric detector for laser energy measurement up to 3.8 J.",
        categoryName: "Energy meters",
        categoryPath: "beam-characterization/energy-meters",
        manufacturer: "LASER COMPONENTS GmbH",
        manufacturerUrl: "https:\/\/www.gentec-eo.com\/products\/qe25lp-s-mb-d0",
        manufacturerNumber: "P\/N 200455"
    },
    {
        uid: "e1ea88cd-fa8c-48bc-901b-b7347d26dcde",
        name: "QE65LP-S-MB-QED-INT-D0",
        description: "Pyroelectric detector for laser energy measurement up to 200 J. With INTEGRA (USB) module.",
        categoryName: "Energy meters",
        categoryPath: "beam-characterization/energy-meters",
        manufacturer: "LASER COMPONENTS GmbH",
        manufacturerUrl: "https:\/\/www.gentec-eo.com\/products\/qe65lp-s-mb-qed-d0?ext=INTEGRA%20%28USB%29",
        manufacturerNumber: "P\/N 202768"
    },
    {
        uid: "6776b48e-efcd-4097-9880-1eba9d31baa7",
        name: "QE50LP-S-MB-QED-D0",
        description: "Pyroelectric detector for laser energy measurement up to 85 J.",
        categoryName: "Energy meters",
        categoryPath: "beam-characterization/energy-meters",
        manufacturer: "LASER COMPONENTS GmbH",
        manufacturerUrl: "https:\/\/www.gentec-eo.com\/products\/qe50lp-s-mb-qed-d0",
        manufacturerNumber: "P\/N 202186"
    },
    {
        uid: "38fea38d-029b-4b90-84c5-18a84156e23d",
        name: "Centauri Dual Channel",
        description: "High End Laser Power\/Energy Meter Compatible with all standard Ophir Thermal, BeamTrack, Pyroelectric and Photodiode sensors for laser measuring",
        categoryName: "Energy meters",
        categoryPath: "beam-characterization/energy-meters",
        manufacturer: "Ophir",
        manufacturerUrl: "https:\/\/www.ophiropt.com\/laser--measurement\/laser-power-energy-meters\/products\/laser-power-meters\/centauri-dual-channel",
        manufacturerNumber: "P\/N 7Z01701"
    },
    {
        uid: "64c0e8c4-74c9-417d-96bc-c95d94794b8a",
        name: "Centauri Single Channel",
        description: "High End Laser Power\/Energy Meter Compatible with all standard Ophir Thermal, BeamTrack, Pyroelectric and Photodiode sensors for laser measuring",
        categoryName: "Energy meters",
        categoryPath: "beam-characterization/energy-meters",
        manufacturer: "Ophir",
        manufacturerUrl: "https:\/\/www.ophiropt.com\/laser--measurement\/laser-power-energy-meters\/products\/laser-power-meters\/centauri",
        manufacturerNumber: "P\/N 7Z01700"
    },
    {
        uid: "89e57e7d-2aa1-4e8a-910b-41288e9c5145",
        name: "Laser Energy Sensor PE25-C",
        description: "The PE25-C is a general purpose pyroelectric energy meter with a 24mm aperture. It can measure energies from 8µJ up to 10J. It can operate at repetition rates up to 10kHz and covers the spectral range from 0.15 - 3µm. The sensor comes with a standard 1.5 meter cable for connecting to a meter or PC interface.",
        categoryName: "Energy meters",
        categoryPath: "beam-characterization/energy-meters",
        manufacturer: "Ophir",
        manufacturerUrl: "https:\/\/www.ophiropt.com\/laser--measurement\/laser-power-energy-meters\/products\/Laser-Pyroelectric-Energy-Sensors\/Pyroelectric-Laser-Energy-Sensors\/PE25-C",
        manufacturerNumber: "P\/N 7Z02937"
    },
    {
        uid: "97a76c97-cd63-4bac-b5ef-f201514292e5",
        name: "Vega",
        description: "Color Screen Handheld Laser Power & Energy Meter",
        categoryName: "Energy meters",
        categoryPath: "beam-characterization/energy-meters",
        manufacturer: "Ophir",
        manufacturerUrl: "https:\/\/www.ophiropt.com\/laser--measurement\/laser-power-energy-meters\/products\/smart-displays\/vega",
        manufacturerNumber: "P\/N 7Z01560"
    },
    {
        uid: "f22ae071-24ff-487d-9724-e7a21b2dc064",
        name: "PE10-C",
        description: "The PE10-C is a pyroelectric energy meter for low energies with a 10mm aperture. It can measure energies from 1µJ up to 10mJ. It can operate at repetition rates up to 25kHz and covers the spectral range from 0.15 - 12µm. The sensor comes with a standard 1.5 meter cable for connecting to a meter or PC interface.",
        categoryName: "Energy meters",
        categoryPath: "beam-characterization/energy-meters",
        manufacturer: "Ophir",
        manufacturerUrl: "https:\/\/www.ophiropt.com\/laser--measurement\/laser-power-energy-meters\/products\/Laser-Pyroelectric-Energy-Sensors\/Pyroelectric-Laser-Energy-Sensors\/PE10-C",
        manufacturerNumber: "P\/N 7Z02932"
    },
    {
        uid: "a5ba4ea7-2d77-4234-af63-6f1bf9266faa",
        name: "PE25-C",
        description: "The PE25-C is a general purpose pyroelectric energy meter with a 24mm aperture. It can measure energies from 8µJ up to 10J. It can operate at repetition rates up to 10kHz and covers the spectral range from 0.15 - 3µm. The sensor comes with a standard 1.5 meter cable for connecting to a meter or PC interface.",
        categoryName: "Energy meters",
        categoryPath: "beam-characterization/energy-meters",
        manufacturer: "Ophir",
        manufacturerUrl: "https:\/\/www.ophiropt.com\/laser--measurement\/laser-power-energy-meters\/products\/Laser-Pyroelectric-Energy-Sensors\/Pyroelectric-Laser-Energy-Sensors\/PE25-C",
        manufacturerNumber: "P\/N 7Z02937"
    },
    {
        uid: "1bd3d749-1991-49ce-af76-b0336e8aef07",
        name: "PE50-C",
        description: "The PE50-C is a general purpose pyroelectric energy meter with a 46mm aperture. It can measure energies from 10µJ up to 10J. It can operate at repetition rates up to 10kHz and covers the spectral range from 0.15 - 3µm. The sensor comes with a standard 1.5 meter cable for connecting to a meter or PC interface.",
        categoryName: "Energy meters",
        categoryPath: "beam-characterization/energy-meters",
        manufacturer: "Ophir",
        manufacturerUrl: "https:\/\/www.ophiropt.com\/laser--measurement\/laser-power-energy-meters\/products\/Laser-Pyroelectric-Energy-Sensors\/Pyroelectric-Laser-Energy-Sensors\/PE50-C",
        manufacturerNumber: "P\/N 7Z02936"
    },
    {
        uid: "ab763fb1-c02e-4ccd-9135-ace64d3dbd94",
        name: "PD300-1W",
        description: "The PD300-1W is a photodiode laser measurement sensor measuring to 1W. It has a 10x10mm aperture with swivel mount and a removable filter. Without filter, its spectral range is 350 - 1100nm and its power measuring range is 500pW - 30mW. With filter the spectral range is 430nm - 1100nm and the power range is 200µW - 1W. It has the exclusive Ophir automatic background subtraction feature. The sensor comes with a 1.5 meter cable for connecting to a meter or PC interface.",
        categoryName: "Energy meters",
        categoryPath: "beam-characterization/energy-meters",
        manufacturer: "Ophir",
        manufacturerUrl: "https:\/\/www.ophiropt.com\/laser--measurement\/laser-power-energy-meters\/products\/Laser-Photodiode-Sensors\/Standard-Photodiode-Sensors\/PD300-1W",
        manufacturerNumber: "P\/N 7Z02411A"
    },
    {
        uid: "355d0a0c-8156-40fc-a7b4-94b69497d9b9",
        name: "PD300-3W",
        description: "The PD300-3W is a photodiode laser measurement sensor measuring to 3W. It has a 10x10mm aperture with swivel mount and a removable filter. Without filter, its spectral range is 350 - 1100nm and its power measuring range is 5nW - 100mW. With filter the spectral range is 430nm - 1100nm and the power range is 200µW to 3W. The sensor comes with a 1.5 meter cable for connecting to a meter or PC interface.",
        categoryName: "Energy meters",
        categoryPath: "beam-characterization/energy-meters",
        manufacturer: "Ophir",
        manufacturerUrl: "https:\/\/www.ophiropt.com\/laser--measurement\/laser-power-energy-meters\/products\/Laser-Photodiode-Sensors\/Standard-Photodiode-Sensors\/PD300-3W",
        manufacturerNumber: "P\/N 7Z02426"
    },
    {
        uid: "1865aed8-f94d-49eb-8389-3b4fc5d983ab",
        name: "SLC-24150 - Linear Piezo Stage",
        description: "With 103 mm, the SLC-24150 features the second longest travel range within the SLC-24 series. It measures 150 x 24 x 10.5 mm and offers a normal force of 30 N.",
        categoryName: "Motorized actuators",
        categoryPath: "motion/motorized-actuators/actuators",
        manufacturer: "SmarAct GmbH",
        manufacturerUrl: "https:\/\/www.smaract.com\/linear-stages\/product\/slc-24150",
        manufacturerNumber: "SLC-24150"
    },
    {
        uid: "339b96ff-310d-471c-9e08-f0bcb24b95e6",
        name: "Pulsar-2",
        description: "Ophir’s 2 channel Pulsar interface turns your PC or laptop into a full fledged Ophir multi-channel laser power\/energy meter. Just install the software, plug the laser measurement sensor into the Pulsar and the USB cable from the Pulsar to the PC USB port. With the Pulsar-2, you can connect up to 2 laser measurement sensors to each module, monitor each pulse at up to 25 kHz and utilize external trigger.",
        categoryName: "Energy meters",
        categoryPath: "beam-characterization/energy-meters",
        manufacturer: "Ophir",
        manufacturerUrl: "https:\/\/www.ophiropt.com\/laser--measurement\/laser-power-energy-meters\/products\/PC-Interfaces\/Pulsar-2",
        manufacturerNumber: "P\/N 7Z01202"
    },
    {
        uid: "94f1fbc1-c412-494e-ae9f-b852eb9b01ff",
        name: "L2000W-BB-120",
        description: "The L2000W-BB-120 is a water cooled thermal power\/energy laser measurement sensor with the very large aperture of 120mm.\nIt can measure power from 1W to 2000W and energy from 6J to 6000J. It has the spectrally flat broadband coating and covers the spectral range from 0.19 to 20µm. The sensor comes with a standard 1.5 meter cable for connecting to a meter or PC interface.",
        categoryName: "Energy meters",
        categoryPath: "beam-characterization/energy-meters",
        manufacturer: "Ophir",
        manufacturerUrl: "https:\/\/www.ophiropt.com\/laser--measurement\/laser-power-energy-meters\/products\/Laser-Thermal-Power-Sensors\/High-Power-Water-Cooled-Thermal-Sensors-And-Power-Pucks\/L2000W-BB-120",
        manufacturerNumber: "P\/N 7Z02751"
    },
    {
        uid: "ce7d5e88-60db-4ba2-8beb-cf70b8b0e74e",
        name: "L50(300)A-PF-65",
        description: "The L50(300)A-PF-65 is a thermal power\/energy laser measurement sensor for high peak power pulsed lasers. It has a 65mm aperture and can measure from 400mW to 300W intermittently and to 50W continuously. It measures energy from 200mJ to 300J. It has a damage threshold of up to 3J\/cm² for ns pulses and covers the spectral range from 0.15 to 20µm. The sensor comes with a standard 1.5 meter cable for connecting to a meter or PC interface.",
        categoryName: "Energy meters",
        categoryPath: "beam-characterization/energy-meters",
        manufacturer: "Ophir",
        manufacturerUrl: "https:\/\/www.ophiropt.com\/laser--measurement\/laser-power-energy-meters\/products\/Laser-Thermal-Power-Sensors\/Medium-Power-Thermal-Sensors\/L50%28300%29A-PF-65",
        manufacturerNumber: "P\/N 7Z02743"
    },
    {
        uid: "089ae649-2e5e-46e3-ba8b-8a2bcc0ab071",
        name: "L250W",
        description: "The L250W is a water cooled low profile thermal power\/energy laser measurement sensor with a 50mm aperture. It can measure power from 1W to 250W and energy from 120mJ to 300J. It has the spectrally flat broadband coating and covers the spectral range from 0.19 to 20µm. The sensor comes with a standard 1.5 meter cable for connecting to a meter or PC interface.",
        categoryName: "Energy meters",
        categoryPath: "beam-characterization/energy-meters",
        manufacturer: "Ophir",
        manufacturerUrl: "https:\/\/www.ophiropt.com\/laser--measurement\/laser-power-energy-meters\/products\/Laser-Thermal-Power-Sensors\/High-Power-Water-Cooled-Thermal-Sensors-And-Power-Pucks\/L250W",
        manufacturerNumber: "P\/N 7Z02688"
    },
    {
        uid: "973c059d-ecde-4ab9-9d4f-630d89727f19",
        name: "30A-P-17",
        description: "The 30A-P-17 is a thermal power\/energy laser measurement sensor for short pulsed lasers with a 17mm aperture. It can measure from 60mW to 30W and from 40mJ to 30J. It has the P type volume absorber and covers the spectral range from 0.15 to 8µm. The sensor comes with a standard 1.5 meter cable for connecting to a meter or PC interface.",
        categoryName: "Energy meters",
        categoryPath: "beam-characterization/energy-meters",
        manufacturer: "Ophir",
        manufacturerUrl: "https:\/\/www.ophiropt.com\/laser--measurement\/laser-power-energy-meters\/products\/Laser-Thermal-Power-Sensors\/Low-Power-Thermal-Sensors\/30A-P-17",
        manufacturerNumber: "P\/N 7Z02693"
    },
    {
        uid: "0deec2c1-a287-4978-80d4-2d32bff7a828",
        name: "PM150-19C",
        description: "PowerMax od Coherent jsou senzory pro měření výkonu kontinuálních laserů a nebo pulsních laserů s dlouhými pulsy. Termofilní senzory využívají principu termočlánku, kdy na absorbční vrstvu dopadá laserové záření, které je měněno v teplo. Mezi touto absorbční vrstvou a chladičem pak vzniká elektrické napětí.",
        categoryName: "Energy meters",
        categoryPath: "beam-characterization/energy-meters",
        manufacturer: "Coherent",
        manufacturerUrl: "https:\/\/www.optixs.cz\/doplnky-a-prislusenstvi--39k\/mereni-vykonu-laseru-99k\/termofilni-senzory-do-300w-133p",
        manufacturerNumber: "PM150-19C"
    },
    {
        uid: "bf145403-1a6f-4b45-a178-f9c1e92818dc",
        name: "ATH 1603 M, DN 250 ISO-F",
        description: "ATH 1603 M, DN 250 ISO-F, with integrated drive electronics OBC V4, DeviceNet, water-cooled, non-heated\n5-axis magnetically levitated turbopump with drag stage for a pump speed of up to 1400 l\/s for N2\nDN 250 ISO-F inlet flange\nOperation with OBC V4 integrated drive electronics\nInstallation in any orientation\nDeviceNet, Water cooled, Non-heated\nCE marked and ROHS compliant",
        categoryName: "Turbomolecular pumps",
        categoryPath: "vacuum-technology/turbomolecular-pumps/vacuum-pumps",
        manufacturer: "PFEIFFER VACUUM AUSTRIA GmbH",
        manufacturerUrl: "https:\/\/webportal.pfeiffer-vacuum.com\/en\/shop\/product\/YE66215A",
        manufacturerNumber: "YE66215A"
    },
    {
        uid: "a2eeda44-b751-49dc-98d0-3c4cc81c36d8",
        name: "ATH 1603 M, DN 200 CF-F",
        description: "5-axis magnetically levitated turbopump with drag stage for a pump speed of up to 1360 l\/s for N2\n    DN 200 CF-F flange for demanding UHV applications\n    Operation with OBC V4 integrated drive electronics\n    Installation in any orientation\n    Remote, Water cooled, Non-heated\n    CE marked and ROHS compliant",
        categoryName: "Turbomolecular pumps",
        categoryPath: "vacuum-technology/turbomolecular-pumps/vacuum-pumps",
        manufacturer: "PFEIFFER VACUUM AUSTRIA GmbH",
        manufacturerUrl: "https:\/\/webportal.pfeiffer-vacuum.com\/en\/shop\/search?text=YC52215A",
        manufacturerNumber: "YC52215A"
    },
    {
        uid: "356c839f-09a3-4cca-a3ac-7749c5ab7845",
        name: "ATH 2303 M, DN 250 ISO-F",
        description: "5-axis magnetically levitated turbopump with drag stage for a pump speed of up to 2150 l\/s for N2\nDN 250 ISO-F inlet flange\nOperation with OBC V4 integrated drive electronics\nInstallation in any orientation\nRemote, Water cooled, Non-heated\nCE marked and ROHS compliant",
        categoryName: "Turbomolecular pumps",
        categoryPath: "vacuum-technology/turbomolecular-pumps/vacuum-pumps",
        manufacturer: "PFEIFFER VACUUM AUSTRIA GmbH",
        manufacturerUrl: "http:\/\/www.pfeiffer-vacuum.com\/products\/turbopumps\/magnetically-levitated\/ath-2300-m\/onlinecatalog.action?detailPdoId=12686",
        manufacturerNumber: "TMBBA662405A"
    },
    {
        uid: "af42031d-61c1-48a1-b24b-d49e7b2fc4ab",
        name: "HiPace 300 M, DN 100, CF-F",
        description: "5-axis magnetically levitated turbopump with a pumping speed of 255 l\/s for N2\nIntegrated digital magnetic bearing controller TM 700\nInstallation in any orientation; flexible through connectivity of up to 4 accessory parts\nWith integrated water cooling for maximum gas throughput\nInterfaces: RS-485, Remote (Profibus\/DeviceNet on request)\nThe turbopump features extremely low vibration and is oil-free\nWith In-field sensor calibration\nIncluding venting valve for pulsed venting\nProtection Class: IP 54\nExtensive accessories expand the range of applications",
        categoryName: "Turbomolecular pumps",
        categoryPath: "vacuum-technology/turbomolecular-pumps/vacuum-pumps",
        manufacturer: "PFEIFFER VACUUM AUSTRIA GmbH",
        manufacturerUrl: "http:\/\/www.pfeiffer-vacuum.com\/products\/turbopumps\/magnetically-levitated\/hipace-300-m\/onlinecatalog.action?detailPdoId=12158#product-downloads",
        manufacturerNumber: "PM P03 952"
    },
    {
        uid: "65a121ab-1523-441e-9ace-f29a70564c38",
        name: "HiPace 300 H, DN 100, ISO-K",
        description: "Rugged, powerful turbopump with a pumping speed of up to 260 l\/s for N2\nExtremely high compression, especially for light gases. Ideal for the generation of an ultra high vacuum\nIntegrated TC 110 drive electronics\nFor installation in any orientation\nExtensive accessories expand the range of applications\nH=Version with extra high compression ratio",
        categoryName: "Turbomolecular pumps",
        categoryPath: "vacuum-technology/turbomolecular-pumps/vacuum-pumps",
        manufacturer: "PFEIFFER VACUUM AUSTRIA GmbH",
        manufacturerUrl: "https:\/\/www.pfeiffer-vacuum.com\/en\/products\/vacuum-generation\/turbopumps\/hybrid-bearing\/hipace-300\/15900\/hipace-300-h-with-tc-110-dn-100-iso-k",
        manufacturerNumber: "PM P05 540"
    },
    {
        uid: "8defb1c8-89b0-4523-9c1e-917dda9d46c4",
        name: "HiPace 300 with TC 400, DN 100, CF-F",
        description: "Rugged, powerful turbopump with a pumping speed of up to 260 l\/s for N2\n    Integrated TC 400 drive electronics\n    Ideal for UHV applications\n    For installation in any orientation\n    With integrated water cooling for maximum gas throughput\n    Flexible through the ability to employ up to 4 accessories\n    Ideal for fast cycles\n    Extensive accessories expand the range of applications",
        categoryName: "Turbomolecular pumps",
        categoryPath: "vacuum-technology/turbomolecular-pumps/vacuum-pumps",
        manufacturer: "PFEIFFER VACUUM AUSTRIA GmbH",
        manufacturerUrl: "https:\/\/www.pfeiffer-vacuum.com\/en\/products\/vacuum-generation\/turbopumps\/hybrid-bearing\/hipace-300\/4501\/hipace-300-with-tc-400-dn-100-cf-f",
        manufacturerNumber: "PM P03 901"
    },
    {
        uid: "95de1fbb-e688-4116-bd9f-4176587ae496",
        name: "HiPace 300 with TC 400, DN 100, ISO-F",
        description: "Rugged, powerful turbopump with a pumping speed of up to 260 l\/s for N2\n    Integrated TC 400 drive electronics\n    Ideal for UHV applications\n    For installation in any orientation\n    With integrated water cooling for maximum gas throughput\n    Flexible through the ability to employ up to 4 accessories\n    Ideal for fast cycles\n    Extensive accessories expand the range of applications",
        categoryName: "Turbomolecular pumps",
        categoryPath: "vacuum-technology/turbomolecular-pumps/vacuum-pumps",
        manufacturer: "PFEIFFER VACUUM AUSTRIA GmbH",
        manufacturerUrl: "https:\/\/www.pfeiffer-vacuum.com\/en\/products\/vacuum-generation\/turbopumps\/hybrid-bearing\/hipace-300\/4502\/hipace-300-with-tc-400-dn-100-iso-f",
        manufacturerNumber: "PM P03 902"
    },
    {
        uid: "e3d1c813-77c3-43e5-8805-ce1c1b93aec9",
        name: "HiPace 80 with TC 110, DN 63, CF-F",
        description: "Small yet powerful turbopump with a pumping speed of up to 67 l\/s for N2\n    Integrated TC 110 drive electronics\n    For installation in any orientation\n    Ideal for dependable systems integration\n    Extensive accessories expand the range of applications",
        categoryName: "Turbomolecular pumps",
        categoryPath: "vacuum-technology/turbomolecular-pumps/vacuum-pumps",
        manufacturer: "PFEIFFER VACUUM AUSTRIA GmbH",
        manufacturerUrl: "https:\/\/webportal.pfeiffer-vacuum.com\/en\/shop\/product\/PM_P03_941_A",
        manufacturerNumber: "PM P03 941 A"
    },
    {
        uid: "0c3f4d7c-3c0c-4956-8b7e-e24790909655",
        name: "HiCube 80 Eco (HiPace 80 + MVP 015-4), DN 63, ISO-K",
        description: "Compact high performance pumping station for all high and ultrahigh vacuum applications\n    Plug and play solution with HiPace 80 turbopump and multistage diaphragm pump MVP 015-4\n    Intermittent mode adapts the pumping station to the process conditions and saves up to 90% energy\n    Easy integration of pressure gauges from the accessories",
        categoryName: "Turbomolecular pumps",
        categoryPath: "vacuum-technology/turbomolecular-pumps/vacuum-pumps",
        manufacturer: "PFEIFFER VACUUM AUSTRIA GmbH",
        manufacturerUrl: "https:\/\/www.pfeiffer-vacuum.com\/en\/products\/vacuum-generation\/pumping-stations\/turbo-pumping-stations\/hicube-eco\/20020\/hicube-80-eco-dn-63-iso-k-mvp-015-4",
        manufacturerNumber: "PM S74 150 00"
    },
    {
        uid: "bab8271e-5eaa-4074-9d5d-01f2a3ba8a92",
        name: "HiCube 80 Eco (HiPace 80 + MVP 015-4), DN 63, CF-F",
        description: "Compact high performance pumping station for all high and ultrahigh vacuum applications\n    Plug and play solution with HiPace 80 turbopump and multistage diaphragm pump MVP 015-4\n    Intermittent mode adapts the pumping station to the process conditions and saves up to 90% energy\n    Easy integration of pressure gauges from the accessories",
        categoryName: "Turbomolecular pumps",
        categoryPath: "vacuum-technology/turbomolecular-pumps/vacuum-pumps",
        manufacturer: "PFEIFFER VACUUM AUSTRIA GmbH",
        manufacturerUrl: "https:\/\/www.pfeiffer-vacuum.com\/en\/products\/vacuum-generation\/pumping-stations\/turbo-pumping-stations\/hicube-eco\/20023\/hicube-80-eco-dn-63-cf-f-mvp-015-4",
        manufacturerNumber: "PM S75 150 00"
    },
    {
        uid: "ed2bc086-4745-4c02-8267-cd1115eaca7f",
        name: "HiCube 300 Eco (HiPace 300 + MVP 030-3), DN 100, ISO-K",
        description: "Compact high performance pumping station for all high and ultrahigh vacuum applications\n    Plug and play solution with HiPace 300 turbopump and multistage diaphragm pump MVP 030-3\n    Intermittent mode adapts the pumping station to the process conditions and saves up to 90% energy\n    Easy integration of pressure gauges from the accessories",
        categoryName: "Turbomolecular pumps",
        categoryPath: "vacuum-technology/turbomolecular-pumps/vacuum-pumps",
        manufacturer: "PFEIFFER VACUUM AUSTRIA GmbH",
        manufacturerUrl: "https:\/\/webportal.pfeiffer-vacuum.com\/en\/shop\/product\/PM_S76_200_00",
        manufacturerNumber: "PM S76 200 00"
    },
    {
        uid: "8a04c389-5ea4-4be7-8da9-e6d45624a54b",
        name: "HiPace700 with TC 400, DN 160, CF-F",
        description: "Compact yet powerful turbopump with a pumping speed of up to 685 l\/s for N2\n    Maximum vacuum performance with minimum power consumption\n    For installation in any orientation\n    Integrated TC 400 drive electronics\n    Integrated, powerful cooling system\n    DN 160 CF-F flange for demanding UHV applications",
        categoryName: "Turbomolecular pumps",
        categoryPath: "vacuum-technology/turbomolecular-pumps/vacuum-pumps",
        manufacturer: "PFEIFFER VACUUM AUSTRIA GmbH",
        manufacturerUrl: "https:\/\/webportal.pfeiffer-vacuum.com\/en\/shop\/product\/PM_P03_934",
        manufacturerNumber: "PM P03 934"
    },
    {
        uid: "6ad157e8-590d-41fc-8f6b-628fe41240d2",
        name: "STP-iXA3306C ISO320F",
        description: "The STP-iXA3306 series magnetically levitated turbomolecular pump provides industry-leading performance and incorporates a small power supply into the onboard control unit – the latest technology of the well-established STPiXA3305 series.\nThe height of the pump is equal to the STP-XA2703\/XA3203 and is also equal to the height of the STP-iXA3305 series without its power supply (iPS-1200). This fully integrated product offers easy installation and a small footprint as an all-in-one solution for all application tools.",
        categoryName: "Turbomolecular pumps",
        categoryPath: "vacuum-technology/turbomolecular-pumps/vacuum-pumps",
        manufacturer: "Edwards Ltd",
        manufacturerUrl: "https:\/\/shop.edwardsvacuum.com\/products\/yt820z040\/view.aspx",
        manufacturerNumber: "YT820Z040"
    },
    {
        uid: "3be71725-9a99-41ff-8984-e33f48bc4948",
        name: "STP-XA3203C ISO320F",
        description: "The STP-XA3203C turbo pump offers high performance in the process range of high vacuum to 2300 sccm process flow with enhanced throughput for all gases. \n\nThis pump is based on a new platform design offering features to improve thermal management, which enhances performance on harsh processes, increases the maximum process flow capability and reduces the effects of corrosion and deposition.\n\nThe outstanding performance is suited to both light and harsh applications, such as semiconductor etch, implant, lithography and LCD processes.",
        categoryName: "Turbomolecular pumps",
        categoryPath: "vacuum-technology/turbomolecular-pumps/vacuum-pumps",
        manufacturer: "Edwards Ltd",
        manufacturerUrl: "https:\/\/shop.edwardsvacuum.com\/products\/yt660z050\/view.aspx",
        manufacturerNumber: "YT660Z050"
    },
    {
        uid: "4cc4ac3c-94c5-4202-88de-b914908becb3",
        name: "STP-iXA4506C ISO320F",
        description: "The fully integrated controller and power supply eliminates the need for cables and a separate\n    controller rack, resulting in a cost effective, compact TMP package that is fast and easy to install in a small footprint.\n    Maximum continuous flow capability of 4300 sccm (N2), achieving a performance increase of more than 50%, when compared to STP-XA4503.\n    The pump will operate efficiently with cooling water supply up to 35 °C.\n    Temperature Management System (TMS) unit is available for processes generating by-products.\n    I\/O Remote, RS232C, RS485, STP-Link are standard ports.\n    UL marked, CE marked, SEMI-S2 and RoHS compliant.",
        categoryName: "Turbomolecular pumps",
        categoryPath: "vacuum-technology/turbomolecular-pumps/vacuum-pumps",
        manufacturer: "Edwards Ltd",
        manufacturerUrl: "https:\/\/shop.edwardsvacuum.com\/products\/YT780Z000\/view.aspx",
        manufacturerNumber: "YT780Z000"
    },
    {
        uid: "8db96013-cd44-4d92-bdc8-e4cda5844843",
        name: "TP-iXA3306C ISO250F",
        description: "The STP-iXA3306 series magnetically levitated turbomolecular pump provides industry-leading performance and incorporates a small power supply into the onboard control unit – the latest technology of the well-established STPiXA3305 series.\nThe height of the pump is equal to the STP-XA2703\/XA3203 and is also equal to the height of the STP-iXA3305 series without its power supply (iPS-1200). This fully integrated product offers easy installation and a small footprint as an all-in-one solution for all application tools.",
        categoryName: "Turbomolecular pumps",
        categoryPath: "vacuum-technology/turbomolecular-pumps/vacuum-pumps",
        manufacturer: "Edwards Ltd",
        manufacturerUrl: "https:\/\/shop.edwardsvacuum.com\/products\/YT820Z020\/view.aspx",
        manufacturerNumber: "YT820Z020"
    },
    {
        uid: "15b4f36b-21ea-431a-89d5-892d144b088e",
        name: "nEXT300D ISO100",
        description: "The nEXT is a hybrid bearing compound turbomolecular pump. nEXT pumps combine our proven bearing technology (oil lubricated ceramic lower bearing with dry permanent magnetic upper bearing), an improved rotor design with a new molecular drag stage to deliver improved pumping speed and compression ratios, and user serviceability. They feature 24 V to 48 V d.c. sensor less motors with a built in drive that is fully compatible with our range of TAG and TIC controllers. They are available pre-set for either 80 W or 160 W maximum power, the former enabling use with our 100 W TIC controllers are also recommended for pumping Argon, but with a longer ramp time to full operating speed.",
        categoryName: "Turbomolecular pumps",
        categoryPath: "vacuum-technology/turbomolecular-pumps/vacuum-pumps",
        manufacturer: "Edwards Ltd (Activair s.r.o.)",
        manufacturerUrl: "https:\/\/shop.edwardsvacuum.com\/products\/b82200100\/view.aspx",
        manufacturerNumber: "B82200100"
    },
    {
        uid: "8e27ae19-7583-4c7f-aa68-ea8152a46c10",
        name: "nEXT400D ISO160",
        description: "The nEXT is a hybrid bearing compound turbomolecular pump. nEXT pumps combine our proven bearing technology (oil lubricated ceramic lower bearing with dry permanent magnetic upper bearing), an improved rotor design with a new molecular drag stage to deliver improved pumping speed and compression ratios, and user serviceability. They feature 24 V to 48 V d.c. sensor less motors with a built in drive that is fully compatible with our range of TAG and TIC controllers. They are available pre-set for either 80 W or 160 W maximum power, the former enabling use with our 100 W TIC controllers are also recommended for pumping Argon, but with a longer ramp time to full operating speed.",
        categoryName: "Turbomolecular pumps",
        categoryPath: "vacuum-technology/turbomolecular-pumps/vacuum-pumps",
        manufacturer: "Edwards Ltd (Activair s.r.o.)",
        manufacturerUrl: "https:\/\/shop.edwardsvacuum.com\/products\/b83200300\/view.aspx",
        manufacturerNumber: "B83200300"
    },
    {
        uid: "696c83c7-c25b-41ef-b11e-236b112244c8",
        name: "TURBOVAC MAG W 2200 iP",
        description: "Pumping speed up to 2,200 l\/s\nHigh pumping speed and high compression ratios for all gases\nHolweck stage incorporated\nResistant to particles and deposits\nInsensitive to shock-venting\nMonitoring and self-protection functions\nMaintenance-free in most applications",
        categoryName: "Turbomolecular pumps",
        categoryPath: "vacuum-technology/turbomolecular-pumps/vacuum-pumps",
        manufacturer: "Leybold (NTG)",
        manufacturerUrl: "https:\/\/www.leyboldproducts.com\/products\/high-vacuum-pumpscryo-technology\/turbovac-turbovac-mag\/turbovac-magintegra\/pumps\/675\/turbovac-mag-w-2200-ip",
        manufacturerNumber: "412200V0504"
    },
    {
        uid: "c6815eab-e072-43be-b09b-c0b06e2a3001",
        name: "TURBOVAC MAG W 3200 CT",
        description: "Accuracy, precision and reliability those are the features of these magnetically-levitated turbomolecular pumps. High pumping speed and gas throughput for faster pump down time improve equipment cycle times. With its fully integrated converter and power supply, conventional rack-mounted controller and interconnecting cables are no longer necessary",
        categoryName: "Turbomolecular pumps",
        categoryPath: "vacuum-technology/turbomolecular-pumps/vacuum-pumps",
        manufacturer: "Leybold (Activair s.r.o.)",
        manufacturerUrl: "https:\/\/www.provac.ie\/product\/turbovac-mag-w-3200-ct\/\nhttps:\/\/www.ptbsales.com\/leybold-turbovac-mag-w-3200-ct-rebuilt.html",
        manufacturerNumber: "400003V0002"
    },
    {
        uid: "9e791acf-67d3-4fe0-93ba-4208e18aa994",
        name: "TURBOVAC 90 i\/iX",
        description: "Pumping speed up to 1.450 l\/s\nOil free hybrid bearings (mechanical\/permanent magnetic)\nInstallation in any orientation\nIntegrated electronics including a variety of options for communication\nand control of accessory components\nTURBO.CONTROL i display unit (optionally as rack version or benchtop unit)\nto control and monitor the pump including connection facility for two pressure\ngauges available as accessory",
        categoryName: "Turbomolecular pumps",
        categoryPath: "vacuum-technology/turbomolecular-pumps/vacuum-pumps",
        manufacturer: "Leybold (Tevak s.r.o.)",
        manufacturerUrl: "https:\/\/www.leyboldproducts.com\/products\/high-vacuum-pumpscryo-technology\/turbovac-turbovac-mag\/turbovac-i-ix-hybrid-bearings\/pumps\/734\/turbovac-90-i\/ix",
        manufacturerNumber: "810031V3300"
    },
    {
        uid: "12ba90c3-5f2a-4b6a-be57-43daa417d415",
        name: "nXDS20i",
        description: "Lubricant-free within the vacuum envelope and hermetically sealed means totally clean and dry vacuum to prevent cross contamination\nNo atmosphere to vacuum shaft seals means bearings are completely isolated, which prevents process attack and means the bearings run cooler and last longer\nSimple single sided scroll arrangement combined with an innovative motor and bearing design allows for easy field service with a minimum of special tooling for low cost of ownership and maximum up-time\nImproved motor and drive efficiencies for reduced power and cost of ownership\nAdvanced interface provides a variety of traditional, analogue and digital control methods enabling remote control\/monitoring via USB, RS232 or RS485",
        categoryName: "Dry vacuum pumps",
        categoryPath: "vacuum-technology/dry-vacuum-pumps/vacuum-pumps",
        manufacturer: "Edwards Ltd",
        manufacturerUrl: "https:\/\/www.activair.cz\/en\/products\/vacuum-pumps\/dry-vacuum-pumps-for-laboratory-r-d\/nxds-scroll-pumps\/nxds20i",
        manufacturerNumber: "A73801983"
    },
    {
        uid: "6b71f360-2196-4dac-9d48-0207a62ebc75",
        name: "nXDS10i",
        description: "Bearing shield ensures separation between process gases and bearing lubrication to ensure clean vacuum and no possibility of contamination to lubrication from process gases, which prolongs bearing life.\n·       Advanced scroll-form and tip-seal technologies -  deliver best‑in-class vacuum performance and unrivalled ultimate vacuum levels. \n·       Unique tip seal design - significantly reduces wear to minimise maintenance and extend service life. \n·       Quiet operation - with typical noise during operation < 52 dB(A) for minimal environmental impact. \n·       Advanced interface - providing a variety of traditional and analogue and digital control methods enabling remote control\/monitoring via RS232 or RS485. \n·       Integrated smart drive - with auto sensing input delivers optimised pumping performance globally. \n·       Pump range - includes 6, 10, 15 and 20 m3h-1",
        categoryName: "Dry vacuum pumps",
        categoryPath: "vacuum-technology/dry-vacuum-pumps/vacuum-pumps",
        manufacturer: "Edwards Ltd",
        manufacturerUrl: "https:\/\/shop.edwardsvacuum.com\/products\/A73601983\/view.aspx",
        manufacturerNumber: "A73601983"
    },
    {
        uid: "32963c1d-6d9f-4638-aaad-fc8f00e050b7",
        name: "ADS602P",
        description: "The Alcatel Adixen ADP ADS Series Two Dry Pumps were designed to minimize potential residue deposits.  This process is achieved by internal gas limitation, diluting the gas on each pump stage with N2, and adjusting the temperature in order to control gas condensation.\nP versions for light\/medium applications\nThe Alcatel Adixen ADP ADS Series Two Dry Pumps offer M4 Monitoring, which consists of an electrical cabinet, hand held remote control, and an electronic cabinet. The ADP ADS Series Two Dry Pumps M4 Monitoring can be interfaced with the main production equipment.\nClean: oil-free, dry pump providing no risk of contamination.\nQuiet: all models include an integrated silencer.\nLow power consumption.\nNitrogen Purge levels can be easily controlled by the user.",
        categoryName: "Dry vacuum pumps",
        categoryPath: "vacuum-technology/dry-vacuum-pumps/vacuum-pumps",
        manufacturer: "PFEIFFER VACUUM AUSTRIA GmbH",
        manufacturerUrl: "https:\/\/www.ajvs.com\/new\/product_info.php?products_id=7511",
        manufacturerNumber: "P2WW300001102"
    },
    {
        uid: "f62ade64-f4e0-43a0-b863-11c98d694a92",
        name: "ACP 15",
        description: "Dry multi-stage Roots technology, SD versions, ACP pumps with a pumping speed of max. 15 m3\/h\n    No particle contamination, thanks to frictionless design: no wearing parts in the pumped gases path\n    No hydrocarbon vapors backstreaming: ACP series pumps are free of lubricant inside the pumping module\n    Constant performances (Pumping speed, max. and ultimate pressure)\n    High reliability: thanks to our expertise of dry multi-stage Roots pumps since 1988\n    Low maintenance costs: no annual field service, complete overhaul only every 20000 hours for ACP 15\n    Condensable vapor ability: with gas ballast ports and drainable silencer",
        categoryName: "Dry vacuum pumps",
        categoryPath: "vacuum-technology/dry-vacuum-pumps/vacuum-pumps",
        manufacturer: "PFEIFFER VACUUM AUSTRIA GmbH",
        manufacturerUrl: "https:\/\/www.pfeiffer-vacuum.com\/en\/products\/vacuum-generation\/multi-stage-roots-pumps\/light-duty-applications\/air-cooled\/low-noise-acp-kits\/32098\/low-noise-kit-acp-15",
        manufacturerNumber: "CKF00040"
    },
    {
        uid: "72bc44e5-79c1-4968-9f7c-152ddd1fc4af",
        name: "ACP 28",
        description: "Dry multi-stage Roots technology, SD versions, ACP pumps with a pumping speed of max. 27 m3\/h\n    No particle contamination, thanks to frictionless design: no wearing parts in the pumped gases path\n    No hydrocarbon vapors backstreaming: ACP series pumps are free of lubricant inside the pumping module\n    Constant performances (Pumping speed, max. and ultimate pressure)\n    High reliability: thanks to our expertise of dry multi-stage Roots pumps since 1988\n    Low maintenance costs: no annual field service, complete overhaul only every 20000 hours for ACP 15\n    Condensable vapor ability: with gas ballast ports and drainable silencer",
        categoryName: "Dry vacuum pumps",
        categoryPath: "vacuum-technology/dry-vacuum-pumps/vacuum-pumps",
        manufacturer: "PFEIFFER VACUUM AUSTRIA GmbH",
        manufacturerUrl: "https:\/\/www.pfeiffer-vacuum.com\/en\/products\/vacuum-generation\/multi-stage-roots-pumps\/light-duty-applications\/air-cooled\/low-noise-acp-kits\/32099\/low-noise-kit-acp-28",
        manufacturerNumber: "CKF00042"
    },
    {
        uid: "88633451-db13-4b67-8ec5-4de58f937585",
        name: "ACP 40",
        description: "Dry multi-stage Roots technology, SD versions, ACP pumps with a Pumping speed of max. 40 m3\/h\n    No particle contamination, thanks to frictionless design: no wearing parts in the pumped gases path\n    No hydrocarbon vapors backstreaming: ACP series pumps are free of lubricant inside the pumping module\n    Constant performances (Pumping speed, max. and ultimate pressure)\n    High reliability : thanks to our expertise of dry multi-stage Roots pumps since 1988\n    Low maintenance costs: no annual field service, complete overhaul only every 22000 hours for ACP 28\/40\n    Condensable vapor ability: with gas ballast ports and drainable silencer. ACP series pumps can handle up to 100 g\/h of pure water vapor",
        categoryName: "Dry vacuum pumps",
        categoryPath: "vacuum-technology/dry-vacuum-pumps/vacuum-pumps",
        manufacturer: "PFEIFFER VACUUM AUSTRIA GmbH",
        manufacturerUrl: "https:\/\/www.pfeiffer-vacuum.com\/en\/products\/vacuum-generation\/multi-stage-roots-pumps\/light-duty-applications\/air-cooled\/sd-versions\/12287\/acp-40-standard-single-phase-manual-gas-ballast",
        manufacturerNumber: "V8SACSGEMF"
    },
    {
        uid: "76efb52f-ca07-486a-a336-e42bc1543b23",
        name: "GXS160\/1750 LD SE",
        description: "Designed for high reliability\n    Adaptable to a wide range of applications\n    Long service interval and easy swap-out\n    Low cost of ownership\n    Minimum workplace and environmental impact\n    Simple to install and operate\n    Ideal for integration into larger systems",
        categoryName: "Dry vacuum pumps",
        categoryPath: "vacuum-technology/dry-vacuum-pumps/vacuum-pumps",
        manufacturer: "Edwards Ltd",
        manufacturerUrl: "https:\/\/shop.edwardsvacuum.com\/products\/gs510005\/view.aspx",
        manufacturerNumber: "GS510005"
    },
    {
        uid: "1b3f4c3c-ff65-4275-bb44-be18f935deca",
        name: "GXS250 LD SE",
        description: "Designed for high reliability\n    Adaptable to a wide range of applications\n    Long service interval and easy swap-out\n    Low cost of ownership\n    Minimum workplace and environmental impact\n    Simple to install and operate\n    Ideal for integration into larger systems",
        categoryName: "Dry vacuum pumps",
        categoryPath: "vacuum-technology/dry-vacuum-pumps/vacuum-pumps",
        manufacturer: "Edwards Ltd",
        manufacturerUrl: "https:\/\/shop.edwardsvacuum.com\/Products\/View.aspx?sku=GS710002",
        manufacturerNumber: "GS710002"
    },
    {
        uid: "174d5b2e-3d47-4b38-93e2-e720c1381584",
        name: "GXS450\/2600F LD SE",
        description: "Designed for high reliability\n    Adaptable to a wide range of applications\n    Long service interval and easy swap-out\n    Low cost of ownership\n    Minimum workplace and environmental impact\n    Simple to install and operate\n    Ideal for integration into larger systems",
        categoryName: "Dry vacuum pumps",
        categoryPath: "vacuum-technology/dry-vacuum-pumps/vacuum-pumps",
        manufacturer: "Edwards Ltd",
        manufacturerUrl: "https:\/\/shop.edwardsvacuum.com\/Products\/View.aspx?sku=GSF150000000",
        manufacturerNumber: "GSF150000000"
    },
    {
        uid: "54703648-6949-4b3e-a159-d57412918359",
        name: "GXS750\/4200F LD SE",
        description: "Designed for high reliability\n    Adaptable to a wide range of applications\n    Long service interval and easy swap-out\n    Low cost of ownership\n    Minimum workplace and environmental impact\n    Simple to install and operate\n    Ideal for integration into larger systems",
        categoryName: "Dry vacuum pumps",
        categoryPath: "vacuum-technology/dry-vacuum-pumps/vacuum-pumps",
        manufacturer: "Edwards Ltd",
        manufacturerUrl: "https:\/\/shop.edwardsvacuum.com\/Products\/View.aspx?sku=GSP150000000",
        manufacturerNumber: "GSP150000000"
    },
    {
        uid: "e4876c87-96af-4545-aeca-aeaece96db87",
        name: "ECODRY 40 plus",
        description: "The ECODRY plus is a family of dry-compression multi-stage Roots vacuum pumps, which sets new standards in noise reduction. The pumps have been specially designed for use in quiet and clean environments, such as analysis and research laboratories. ECODRY plus provide clean vacuum at maximum pumping speeds of 40 and 55 m³\/h while creating  low noise levels. They deliver stable vacuum performance for many years without maintenance.\nThe pumps are based on the multi-stage Roots pumping principle with two contactless rotating rotors turning in opposite direction. Through their rotation the gas is moved from the inlet to the exhaust. By the effect of multiple pumping stages the gas is compressed from medium vacuum range to ambient pressure.\nThe products are standing out due to the following features:\n    Quiet – With the integrated acoustic insulation and silencer the noise level of these pumps is lower than 52 dB(A) - quieter than a normal conversation.\n    Clean – With an oil-free suction chamber and wear-free operation, neither oil vapors nor particles are contaminating the vacuum chamber or the environment.\n    Maintenance-free – Changing oil or seals is not required - the pumps deliver stable vacuum performance for many years without maintenance.\n    Easy to use – The pumps are compact, powered by regular single-phase sockets, air-cooled and easy to reposition by integrated wheels.",
        categoryName: "Dry vacuum pumps",
        categoryPath: "vacuum-technology/dry-vacuum-pumps/vacuum-pumps",
        manufacturer: "Leybold",
        manufacturerUrl: "https:\/\/www.leyboldproducts.de\/en\/products\/dry-compressing-vacuum-pumps\/ecodry-plus\/pumps\/2678\/ecodry-40-plus",
        manufacturerNumber: "161040V22"
    },
    {
        uid: "5d0bc1ba-4d85-4054-ab3c-29793fed0fce",
        name: "Ecodry 65 plus",
        description: "The ECODRY plus is a family of dry-compression multi-stage Roots vacuum pumps, which sets new standards in noise reduction. The pumps have been specially designed for use in quiet and clean environments, such as analysis and research laboratories. ECODRY plus provide clean vacuum at maximum pumping speeds of 40 and 55 m³\/h while creating  low noise levels. They deliver stable vacuum performance for many years without maintenance.\nThe pumps are based on the multi-stage Roots pumping principle with two contactless rotating rotors turning in opposite direction. Through their rotation the gas is moved from the inlet to the exhaust. By the effect of multiple pumping stages the gas is compressed from medium vacuum range to ambient pressure.\nThe products are standing out due to the following features:\n    Quiet – With the integrated acoustic insulation and silencer the noise level of these pumps is lower than 52 dB(A) - quieter than a normal conversation.\n    Clean – With an oil-free suction chamber and wear-free operation, neither oil vapors nor particles are contaminating the vacuum chamber or the environment.\n    Maintenance-free – Changing oil or seals is not required - the pumps deliver stable vacuum performance for many years without maintenance.\n    Easy to use – The pumps are compact, powered by regular single-phase sockets, air-cooled and easy to reposition by integrated wheels.",
        categoryName: "Dry vacuum pumps",
        categoryPath: "vacuum-technology/dry-vacuum-pumps/vacuum-pumps",
        manufacturer: "Leybold",
        manufacturerUrl: "https:\/\/www.leyboldproducts.de\/en\/products\/dry-compressing-vacuum-pumps\/ecodry-plus\/pumps\/2679\/ecodry-65-plus?c=15258",
        manufacturerNumber: "161065V22"
    },
    {
        uid: "ff2ec3e0-e041-4fef-a4a2-6ae8f2901669",
        name: "COOLVAC 10000",
        description: "COOLVAC vacuum pumps are refrigerator cryo pumps which generate a vacuum when gaseous substances are bound to the cold surfaces within the pump by means of cryocondensation. Because of the pumping principle COOLVAC cryo pumps have a high effective pumping speed for all gases. COOLVAC vacuum pumps produce a hydro carbon free ultra high vacuum inthe pressure range from 10-3 mbar to 10-11 mbar (0.75•10-3 to 0.75•10-11 Torr)",
        categoryName: "Cryopumps",
        categoryPath: "vacuum-technology/cryopumps/vacuum-pumps",
        manufacturer: "Leybold (Tevak)",
        manufacturerUrl: "https:\/\/www.leyboldproducts.com\/products\/high-vacuum-pumpscryo-technology\/coolvac-coolpower-coolpak\/coolvac-cryo-pumps\/coolvac-cryo-pumps\/3312\/coolvac-10000",
        manufacturerNumber: "844502Vwxyz"
    },
    {
        uid: "ae7560d9-3753-4b98-b867-7d03697d2d67",
        name: "Z825BV - Vacuum-Compatible 25 mm Motorized Actuator with Ø3\/8\" Barrel Fitting",
        description: "Vacuum-Compatible DC Motor Actuator, 25 mm Travel\n6 VDC Servo Actuator\nSub-micron Resolution\n2.3 mm\/s Maximum Velocity\nDrop In Replacement for Most 12 mm Manual Actuators\nCompatible with Ø3\/8\" (Ø9.525 mm) Barrel-Fitting Stages and Mounts\nLimit Switches for Zero Datum and Actuator Protection\nRated Down To 10-6 Torr.",
        categoryName: "Motorized actuators",
        categoryPath: "motion/motorized-actuators/actuators",
        manufacturer: "Thorlabs",
        manufacturerUrl: "https:\/\/www.thorlabs.com\/thorproduct.cfm?partnumber=Z825BV",
        manufacturerNumber: "Z825BV"
    },
    {
        uid: "186f30b9-948c-4d1a-a6fd-b783a84014f4",
        name: "Z825B - 25 mm Motorized Actuator with Ø3\/8\" Barrel (0.5 m Cable)",
        description: "6 VDC Servo Actuator\n    Sub-micron Resolution\n    Maximum Velocity: 2.3 mm\/s\n    Drop In Replacement for Most 25 mm Manual Actuators\n    Compatible with Stages and Mounts that Accept Ø3\/8\" (Ø9.525 mm) Barrels\n    Limit Switches for Zero Datum and Actuator Protection\n    Also Available in 6 mm and 12 mm Travel Versions",
        categoryName: "Motorized actuators",
        categoryPath: "motion/motorized-actuators/actuators",
        manufacturer: "Thorlabs",
        manufacturerUrl: "https:\/\/www.thorlabs.com\/thorproduct.cfm?partnumber=Z825B",
        manufacturerNumber: "Z825B"
    },
    {
        uid: "1d982144-a26e-4dae-aabd-f00ffdf0980f",
        name: "Z812V - Vacuum-Compatible 12 mm Motorized Actuator, 1\/4\"-80 Thread",
        description: "6 VDC Servo Actuator\n    Submicron Resolution\n    Maximum Velocity: 2.3 mm\/s\n    Drop In Replacement for Most 12 mm Manual Actuators\n    Compatible with 1\/4\"-80 Thread (Z812V) and Ø3\/8\" (9.525 mm) Barrel-Fitted (Z812BV) Stages and Mounts\n    Limit Switches for Zero Datum and Actuator Protection\n    Rated Down To 10-6 Torr.\n    Also Available in 6 mm and 25 mm Travel Versions",
        categoryName: "Motorized actuators",
        categoryPath: "motion/motorized-actuators/actuators",
        manufacturer: "Thorlabs",
        manufacturerUrl: "https:\/\/www.thorlabs.com\/thorproduct.cfm?partnumber=Z812V",
        manufacturerNumber: "Z812V"
    },
    {
        uid: "8aae2653-dda8-40ba-8caa-4e6366fb88bb",
        name: "PAS005 - Piezoelectric Actuator, 20 µm Travel",
        description: "Modular Piezoelectric Actuators for Fine Positioning\n    Available as Open or Closed-Loop with Feedback\n    Ø1\/2\" Barrel for Compatibility with LNR50 Series TravelMax Stages",
        categoryName: "Motorized actuators",
        categoryPath: "motion/motorized-actuators/actuators",
        manufacturer: "Thorlabs",
        manufacturerUrl: "https:\/\/www.thorlabs.com\/thorproduct.cfm?partnumber=PAS005",
        manufacturerNumber: "PAS005"
    },
    {
        uid: "17a04fcf-a456-488e-98f1-ab99cea22222",
        name: "PIAK10 - Piezo Inertia Actuator, 10 mm Travel, 1\/4\"-80 Mounting Thread",
        description: "Actuators Provide High-Resolution Linear Motion in a Compact Package\n    PIAK10: 1\/4\"-80 Mounting Thread for Compatibility with Mirror Mounts\n    PIA13, PIA25, & PIA50: Ø3\/8\" (Ø9.525 mm) Barrel for Mounting to Manual Stages with Ø3\/8\" (Ø9.525 mm) Mounting Clamps\n    KIM001 or KIM101 Controller Required for Operation (Sold Separately Below)",
        categoryName: "Motorized actuators",
        categoryPath: "motion/motorized-actuators/actuators",
        manufacturer: "Thorlabs",
        manufacturerUrl: "https:\/\/www.thorlabs.com\/thorproduct.cfm?partnumber=PIAK10",
        manufacturerNumber: "PIAK10"
    },
    {
        uid: "d1c3b581-dc18-43df-97e8-1988b36daa26",
        name: "PIAK10VF - Vacuum-Compatible Piezo Inertia Actuator, 10 mm Travel, 1\/4\"-100 Mounting Thread",
        description: "Compact Design: 31.5 mm x 17.0 mm (W x H)\n    20 nm Typical Step Size\n    Manual Adjustment via Knob on Adjuster Screw\n    Rated Down to 10-6 Torr\n    125 V Maximum Operating Voltage\n    1\/4\"-100 Mounting Thread for Compatibility with KS1TV Ø1\" Mirror Mount\n    Ideal for Set-and-Hold Applications that Require High-Resolution Relative Positioning\n    Vacuum-Compatible PIA13VF Actuator for Translation Stages Also Available",
        categoryName: "Motorized actuators",
        categoryPath: "motion/motorized-actuators/actuators",
        manufacturer: "Thorlabs",
        manufacturerUrl: "https:\/\/www.thorlabs.com\/thorproduct.cfm?partnumber=PIAK10VF",
        manufacturerNumber: "PIAK10VF"
    },
    {
        uid: "42c1b6f4-13da-4f0c-82fb-baa6c25f44b2",
        name: "Picomotor Piezo Linear Actuator",
        description: "Picomotor actuators are ideal for motorizing fine-positioning stages and mounts for applications that require exceptional precision, small step sizes, and set-and-forget stability, all in a compact package.\n    30 nm positioning resolution\n    Substantial 22 N axial load capacity\n    Set-and-forget long-term stability\n    Easy-to-use, flexible controller\/drivers\n    Manual adjustment knob\n    Simple integration",
        categoryName: "Motorized actuators",
        categoryPath: "motion/motorized-actuators/actuators",
        manufacturer: "Newport",
        manufacturerUrl: "https:\/\/www.newport.com\/f\/picomotor-piezo-linear-actuators",
        manufacturerNumber: "8302"
    },
    {
        uid: "a665e2ea-3d04-4857-a7a0-d3211e96521f",
        name: "Picomotor Actuator, Vacuum Compatible",
        description: "he 8302-V Vacuum Compatible Picomotor™ Actuator has 1.0 inch (25.4 mm) travel, and is an ideal device for motorizing fine-positioning stages and mounts in your optical or mechanical systems. Use it with our opto-mechanical translation stages or your own custom devices. It has better than 30-nm resolution with minimal backlash, and can exert a 5-lb (22-N) force. Moreover, it offers exceptional long-term stability and the ability to hold their position with no power applied. These last two features make the Picomotor unique among motion-control devices and ideal for typical set-and-hold applications. Such applications include precision control of sample holders inside cold and\/or vacuum chambers, hands-off adjustment of hard-to-reach mirror mounts (like those in the center of a large setup), or adjustments of optical mounts that are sensitive to forces applied while twisting a knob (for instance optimizing the alignment of a laser cavity or adjusting the pointing of a beam over a long distance).",
        categoryName: "Motorized actuators",
        categoryPath: "motion/motorized-actuators/actuators",
        manufacturer: "Newport",
        manufacturerUrl: "https:\/\/www.newport.com\/p\/8302-V",
        manufacturerNumber: "8302-V"
    },
    {
        uid: "bfcf95ab-8a0b-4f69-a10e-68c8143958e3",
        name: "Motorized Linear Actuator, 11 mm Travel, Micro Step Drive",
        description: "The NSA12 Miniature Motorized Linear Actuator with 11 mm travel is an economical solution for motorizing mirror mounts, rotation stages, linear stages and other manual motion devices. They are ideal for remote adjustment of sensitive, hard-to-reach optical components which can be influenced by the compressive and torsional forces imposed by traditional manual adjustment micrometers. Typical applications include optimizing the alignment of a laser cavity, zeroing in on coherence lengths or just adjusting the pointing of a beam over a long distance. Individual actuator only, controller not included.",
        categoryName: "Motorized actuators",
        categoryPath: "motion/motorized-actuators/actuators",
        manufacturer: "Newport",
        manufacturerUrl: "https:\/\/www.newport.com\/p\/NSA12",
        manufacturerNumber: "NSA12"
    },
    {
        uid: "94a5ab4f-d1d9-472c-8b7c-49e10053cd0e",
        name: "Motorized Linear Actuator, 11 mm Travel, Vacuum Compatible",
        description: "The NSA12V6 miniature motorized linear actuator with 11 mm travel is a Vacuum compatible to 10-6 hPa solution for motorizing mirror mounts, rotation stages, linear stages and other manual motion devices. They are ideal for remote adjustment of sensitive, hard-to-reach optical components which can be influenced by the compressive and torsional forces imposed by traditional manual adjustment micrometers. Typical applications include optimizing the alignment of a laser cavity, zeroing in on coherence lengths or just adjusting the pointing of a beam over a long distance.",
        categoryName: "Motorized actuators",
        categoryPath: "motion/motorized-actuators/actuators",
        manufacturer: "Newport",
        manufacturerUrl: "https:\/\/www.newport.com\/p\/NSA12V6",
        manufacturerNumber: "NSA12V6"
    },
    {
        uid: "76b33727-ec3c-496e-802e-33bd0f6ea6e9",
        name: "Motorized Actuator, Miniature, 12 mm Travel, Stepper, 25-pin D-Sub",
        description: "The TRA12PPD Miniature Stepper Motor Actuator provides 12 mm travel in a slim, 15 mm diameter housing and is the recommended choice for motorizing 561 series linear stages, and 481 and RS65 rotation stages. TRA actuators incorporate an excellent space saving design that allows them to be used with a wide variety of linear stages, mirror mounts, and OEM applications. 25-pin D-Sub connector.",
        categoryName: "Motorized actuators",
        categoryPath: "motion/motorized-actuators/actuators",
        manufacturer: "Newport",
        manufacturerUrl: "https:\/\/www.newport.com\/p\/TRA12PPD",
        manufacturerNumber: "TRA12PPD"
    },
    {
        uid: "24cd2dfe-c57f-4f51-b081-f94db409cbc5",
        name: "Motorized Actuator, Compact, 6 mm Travel, Stepper Motor",
        description: "The TRB6PP Compact Stepper Actuator provides 6 mm travel with sub-micron MIM, very good repeatability and high push force. TRB actuators can replace micrometers which are used a wide variety of linear stages, mirror mounts, and OEM applications.",
        categoryName: "Motorized actuators",
        categoryPath: "motion/motorized-actuators/actuators",
        manufacturer: "Newport",
        manufacturerUrl: "https:\/\/www.newport.com\/p\/TRB6PP",
        manufacturerNumber: "TRB6PP"
    },
    {
        uid: "b65bf163-d07f-4585-9e9d-0dde57cbd395",
        name: "Motorized Actuator, High Speed, 50 mm Travel, Vacuum Compatible",
        description: "The Vacuum Compatible LTAHSPPV6 High Speed Motorized Actuator is optimized for high-speed applications and provides a 50 mm travel range. LTA actuators are designed to fit into other vacuum compatible manual stages and opto-mechanical components as direct replacements for manual micrometers Featuring a space-saving design with the motor and lead screw mounted side-by-side, the LTAHSPPV6 is ideal for space constrained setups, common to vacuum applications. This design not only reduces the actuator length by 50%, but also minimizes the unwanted effects of long cantilever loads on micro-positioning equipment. Precision motion is accomplished through a miniature stepper motor with optimized output torque. This allows for faster motion and high load capacity.",
        categoryName: "Motorized actuators",
        categoryPath: "motion/motorized-actuators/actuators",
        manufacturer: "Newport",
        manufacturerUrl: "https:\/\/www.newport.com\/p\/LTAHSPPV6",
        manufacturerNumber: "LTAHSPPV6"
    },
    {
        uid: "9863bf13-0b87-4705-97f4-541517ecbe4b",
        name: "VHRU-10V6",
        description: "Custom Vacuum Actuator",
        categoryName: "Motorized actuators",
        categoryPath: "motion/motorized-actuators/actuators",
        manufacturer: "Newport",
        manufacturerUrl: "https:\/\/www.newport.com\/s\/advanced-motion-control-products",
        manufacturerNumber: "VHRU-10V6"
    },
    {
        uid: "9b78f56f-55eb-4e99-b7c3-426ce20bc5f6",
        name: "Motorized Actuator, Miniature, 6 mm Travel, Vacuum Compatible",
        description: "The TRA6PPV6 Miniature Stepper Motor Actuator provides 6 mm travel in a slim, 15 mm diameter housing and is the recommended choice for motorizing 561 series linear stages, and 481 and RS65 rotation stages. TRA actuators incorporate an excellent space saving design that allows them to be used with a wide variety of linear stages, mirror mounts, and OEM applications. Vacuum compatible to 10-6 hPa.",
        categoryName: "Motorized actuators",
        categoryPath: "motion/motorized-actuators/actuators",
        manufacturer: "Newport (MIT, spol. s r. o.)",
        manufacturerUrl: "https:\/\/www.newport.com\/p\/TRA6PPV6",
        manufacturerNumber: "TRA6PPV6"
    },
    {
        uid: "c0b9dba1-8c5a-4768-ab61-ff4f3acdbf6f",
        name: "Motorized Actuator, High Load, 25 mm Travel, Vacuum Compatible",
        description: "The Vacuum compatible High load LTAHLPPV6 actuator with 25 mm travel. Recommended for heavy load applications, the LTAHLPPV6 features a robust, 8 mm diameter rod and a M12-0.5 mounting bezel that is compatible with vacuum versions of the UMR8 and MVN80 linear stages. LTA actuators are designed to fit into existing manual stages and other opto-mechanical components as direct replacement for manual micrometers. Featuring a space-saving design ideal for limited space in vacuum chambers, the LTA motor and lead screw are mounted side-by-side. This not only reduces the actuator length by 50%, but also minimizes the unwanted effects of long cantilever loads on micro-positioning equipment.  Precision motion is accomplished through a miniature stepper motor with optimized output torque. This allows for faster motion and high load capacity. A movable limit switch prevents over-travel. The switch positions can be changed in minutes to adjust the maximum travel position.",
        categoryName: "Motorized actuators",
        categoryPath: "motion/motorized-actuators/actuators",
        manufacturer: "Newport (MIT, spol. s r. o.)",
        manufacturerUrl: "https:\/\/www.newport.com\/p\/LTAHLPPV6",
        manufacturerNumber: "LTAHLPPV6"
    },
    {
        uid: "1937024c-6b52-49d9-a115-7bfc42107872",
        name: "Picomotor Actuator, Vacuum Compatible, 0.5 in. Travel, 0.375 in. Shank",
        description: "The 8301-V Vacuum Compatible Picomotor™ Actuator has 0.5 inch (12.7 mm) travel, and is an ideal device for motorizing fine-positioning stages and mounts in your optical or mechanical systems. Use it with our opto-mechanical translation stages or your own custom devices. It has better than 30-nm resolution with minimal backlash, and can exert a 5-lb (22-N) force. Moreover, it offers exceptional long-term stability and the ability to hold their position with no power applied. These last two features make the Picomotor unique among motion-control devices and ideal for typical set-and-hold applications. Such applications include precision control of sample holders inside cold and\/or vacuum chambers, hands-off adjustment of hard-to-reach mirror mounts (like those in the center of a large setup), or adjustments of optical mounts that are sensitive to forces applied while twisting a knob (for instance optimizing the alignment of a laser cavity or adjusting the pointing of a beam over a long distance).",
        categoryName: "Motorized actuators",
        categoryPath: "motion/motorized-actuators/actuators",
        manufacturer: "Newport (MIT, spol. s r. o.)",
        manufacturerUrl: "https:\/\/www.newport.com\/p\/8301-V",
        manufacturerNumber: "8301-V"
    },
    {
        uid: "b789c56f-1f00-4da9-97ee-e4bf19ea49e3",
        name: "Micro Pusher MP-20",
        description: "Travel range up to 75 mm\n High Resolution up to 0.02216 µm\n Recirculating ball screw\n *Maximum speed 3.5 mm\/sec\n Force max. 12.5 kg\n Limit switches integrated\n Module combination\n Including both Inserts MP-B & MP-F",
        categoryName: "Motorized actuators",
        categoryPath: "motion/motorized-actuators/actuators",
        manufacturer: "PI (Physik Instrumente) L.P.",
        manufacturerUrl: "http:\/\/www.micosusa.com\/old\/MP_20L.html",
        manufacturerNumber: "MP-20"
    },
    {
        uid: "7c59c989-5ce5-4a0d-b197-8c3971e2fc78",
        name: "8MS00V - Vacuum Compatible Motorized Screw",
        description: "High vacuum compatible Sub-D, male or female, 9 or 15 pin connectors can be ordered separately. The connectors are made of glass filled polymer with a stainless steel outer and suitable for High Vacuum (10-6 Torr) and temperatures up to 110°C.",
        categoryName: "Motorized actuators",
        categoryPath: "motion/motorized-actuators/actuators",
        manufacturer: "Standa Ltd.",
        manufacturerUrl: "https:\/\/www.standa.lt\/products\/catalog\/vacuum_compatible_stages?item=504&prod=vacuum-compatible-motorized-screw",
        manufacturerNumber: "8MS00V-10-VSS43"
    }
]
