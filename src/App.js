import './App.css';
import { useState, useEffect } from 'react';
import Job from './components/Job';

function App() {

  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [location, setLocation] = useState('New York, NY')
  const [level, setLevel] = useState('');
  const [company, setCompany] = useState('Amazon'); // can't be null
  const [companySearch, setCompanySearch] = useState('');
  const [locationSearch, setLocationSearch] = useState('');

  const handleChange = (e) => {
    setCompanySearch(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const found = acceptedCompanies.find(element => {
      return element.toLowerCase() === companySearch.toLowerCase()
    })

    if (!found) {
      alert(`${companySearch} doesn't exist or has no jobs listed.`)
    }
    const titleCase = companySearch.split(' ').map(i => i[0].toUpperCase() + i.slice(1)).join(' ')
    const updated = encodeURI(titleCase);
    setCompany(updated);
  }

  const acceptedCompanies = [
    "Frontpoint", "Spryker", "Persado", "Klaviyo", "Sedera", "Betterment", "Northrop Grumman", "Lever", "4Degrees",
    "Billtrust", "Validity", "MoneyLion", "Liberty Mutual Insurance", "HP", "VMware", "TrackMaven", "Coursera",
    "The Pi Group", "IBM", "Mondo", "Expensify", "Smashbox Cosmetics", "Justworks", "Anonyome", "Brighton Jones",
    "The Predictive Index", "Freire Schools", "Yext", "Stimulus, Inc.", "PulsePoint",
    "National Rural Utilities Cooperative Finance Corporation", "Encore Event Technologies", "Sunrun", "FOSSA",
    "Valence", "b atomic", "NeueHouse", "First Look Media", "Constructive Partnerships Unlimited",
    "George Brown College", "Life360", "Smartsheet", "ICW Group", "The Trade Desk Archive", "Swing Education",
    "LiveRamp", "AB Tasty", "People's Prep", "Activision", "First Republic Bank", "iQmetrix", "Affinity Health Plan",
    "Ideal Image", "SmartBrief", "Trustpilot", "CSC", "Navex", "Unilever", "Guardhat, Inc.", "Arrow Electronics",
    "Benchling", "Civic Builders", "Ellucian", "Ghostery", "Office Practicum", "Ibotta", "Black Spectacles",
    "Tom James", "Nav Inc.", "SIRUM", "Care/of", "Plug Power", "Radius", "WES", "Future", "Taulia", "Reputation.com",
    "Qualcomm", "Nubank", "Flutterwave", "Goosehead Insurance", "Stantec", "Ascend", "Curaleaf", "Bonobos",
    "Student Loan Hero", "Bowery Farming", "Hurdle", "Color Of Change", "Humana", "Raymond West", "Freshworks",
    "FRONTSTEPS", "Socotra", "Howard Hughes Medical Institute", "Copper", "Cleo", "Smart City Apartment Locating",
    "Nexus", "MBI", "Open Systems Healthcare", "Accenture Federal Services", "Aircall", "Upswing", "Cyware",
    "ICM Partners", "Kargo", "Verb Surgical", "Autodesk", "Clarity AI", "Chainalysis", "Cardlytics", "Newsela",
    "InVision", "Broadridge", "Derive Systems", "Pilotly", "Qrypt", "Guidewire", "JeffreyM Consulting LLC", "LegalZoom",
    "Tenaska", "Gladly", "CarMax", "WEX", "Novartis", "Sandbox", "CipherHealth", "Nearpod", "AT&T", "ENTITY", "Better",
    "Veeam", "RingCentral", "Remesh", "DoSomething", "Wave", "Adobe", "EPAM Systems", "CEEK VR INC", "CrowdStrike",
    "The Wall Street Journal", "Carbon", "ServiceNow", "CarGurus", "TNTP", "Argen Corporation", "Dropbox",
    "Leesa Sleep", "GlobalGiving", "Jackson Hewitt", "Synaptics", "Kevala, Inc", "Pulte Mortgage",
    "Shimadzu Scientific Instruments", "Integral Ad Science", "Explore Schools", "Reonomy", "Amazon", "Founder Shield",
    "BMC Software", "eBay", "Optima Tax Relief", "Taboola", "Omni Interactions", "Venture For America", "Checkr",
    "InsPro Technologies", "Kirlin", "Cofense", "CoVerica Insurance Inc", "Access Intelligence", "Stride Consulting",
    "ReachMobi Inc", "Grand Rounds Health", "AOL", "Affectiva", "Core Digital Media", "540", "Skyryse", "Ada",
    "Patagonia", "Jetty", "Hatch", "Method", "Lob", "The Sliding Door Company", "Handy", "WeWork", "NFL", "Fidelity",
    "Humu, Inc", "Xometry", "Baker Tilly", "World Fuel", "Captivate", "DIG", "Riskified", "TIAA", "Beautycounter",
    "Signify", "Tyson Foods", "KellyMitchell", "VIZIO", "Odyssey Information Services", "Teachers Pay Teachers",
    "Booking.com", "AbbVie", "USAA", "Delta Air Lines", "MetLife", "ecobee", "AbleVets", "EVERFI",
    "CSE Insurance Group", "Right At School", "Vimeo", "Nylas", "Ideosity", "Mars Inc.", "Thought Machine", "Hulu",
    "Energy Transfer Partners", "Sysco", "Nationwide Insurance", "TruStone Financial", "Marketo", "BlackRock", "LVMH",
    "ExxonMobil", "American Airlines", "Raytheon BBN Technologies", "Giant Eagle", "Pfizer", "Hint", "Bread",
    "New York Life", "Hiya", "GrubStreet", "Coleman Research", "Twitter", "Laika", "Advanced Group", "PHMG", "PepsiCo",
    "Coney Island Prep", "BitGo", "Flatiron Health", "McKesson", "Gentle Dental", "Vivacity Tech PBC", "FedEx",
    "Plenty", "Patientory, Inc.", "Warner Bros. Discovery", "Porte Brown", "Cureatr, Inc.", "Best Made Co",
    "Foundermade", "Carrot Fertility", "Expert Institute", "Rock Content", "Flex", "Matillion",
    "TMA - The Marketing Arm", "Etsy", "Empyrean", "Feedvisor", "Unruly", "BMW of North America, LLC", "Zoox", "Talend",
    "Strava", "Square", "Second Closet", "Scholly", "Doma", "TrialSpark", "Five to Nine", "Storable",
    "Modern Treasury Corp", "Equity Lifestyle Properties", "Yandex", "Angie's List", "Civic Financial Services",
    "Thompson Creek®", "Beeswax", "Wiser", "Stord", "Podium", "Pineapple Payments", "Pex", "NVIDIA", "Biogen",
    "EverQuote", "Bond", "Newchip", "Intersection", "Bloomberg LP", "Whip Media", "Kenna Security", "CB Insights",
    "Story", "Sterling National Bank", "SPARK Neuro", "MicroStrategy", "Kustomer", "Kraft Heinz", "Trail of Bits",
    "Hello Alice", "Harlem Children’s Zone", "Austin Pets Alive!", "LoanStreet", "Spokeo", "Asensus Surgical",
    "Bombora", "Coinbase", "FireEye", "FinancialForce", "Epic Games", "Devoted Health", "VIPKID", "Abnormal Security",
    "Zappos", "Gravity", "M2 Technologies", "Dematic", "Edelman Financial Engines", "The Brand Guild", "MikeWorldWide",
    "Dandelion Energy", "Federal Bureau of Investigation (FBI)", "Prometheus", "Ankr", "Droplette", "Sendwave",
    "Morgan Lewis", "iCapital Network", "Mentor Collective", "TYRA Beauty", "Mented Cosmetics", "HydraFacial",
    "Fini Brand", "TriNetX", "The Los Angeles Times", "Fashion Snoops", "American International Group", "AdvaMed",
    "Revature", "EarthOptics", "Burton Snowboards", "Chewy", "dysrupt", "Warner Bros. Discovery Ottawa",
    "MedStar National Rehabilitation Network", "Entelo", "Pearl Capital", "Sir Kensington's", "Compass", "Column",
    "Eventbrite", "L2", "LendingHome", "CapTech", "Intel", "Kendra Scott", "Knot Standard", "Hearst Magazines",
    "QSC, LLC", "Knotel", "Best Buy", "Automattic", "Target", "The Trium Group", "Slack", "City of Houston",
    "iProspect", "Circa Healthcare", "Twilio", "Credit Karma", "City of Scottsdale, AZ", "The Auto Club Group",
    "Trustwave", "Chevron", "Medidata", "Spanx", "Mohawk Industries", "Pactiv", "Rover",
    "Houston-The City With No Limits", "Prezi", "Gloat", "Exact Sciences", "NFP", "Crescent Bank", "MediaCom", "Coty",
    "FTD Companies", "Red Van Workshop", "Lytx", "Zume", "ComplySci", "BAE Systems", "IgnitionOne", "Cisco Meraki",
    "Matthews Real Estate Investment Services", "Oak Island Creative", "Diversified Communications", "PagerDuty",
    "BayFirst", "BNY Mellon", "Compa", "Tandem", "Carbyne", "J. J. Keller & Associates, Inc.", "Intradiem",
    "Place Exchange", "Parrot Analytics", "Conductor", "owners.com", "Hinge", "Snap", "Shippo", "Procore Technologies",
    "Axon", "System High", "Rheem", "Updater", "Evernote", "Palo Alto Networks", "PURE Insurance", "LendKey",
    "NoRedInk", "Hachette Book Group", "Clutch", "PM3 Agency", "ProsperWorks", "Prepaired", "Altpoint Capital",
    "Hunt Club", "Hotel Engine", "Apple", "Gap Inc.", "Stack Overflow", "Sinclair Broadcast Group", "Springboard",
    "PwC", "Live Nation Entertainment", "Honeycomb", "AdHawk & FloorForce", "Elmcor Youth & Adult Activities, Inc",
    "ADT", "Choco", "Automation Anywhere", "HotChalk", "Le Pain Quotidien", "Paysafe", "Tend", "iCIMS",
    "Oncopeptides Inc.", "Noodle", "Quanterix", "Vim", "AnitaB.org", "Everbridge", "Restoration Management Company",
    "Tassat", "Speedway", "Altais", "Splunk", "Share Local Media", "Labcorp", "Hubba", "Spartan", "Affectiva archive",
    "Virid", "Amplify", "Book Of The Month", "Brex", "WordStream", "Next Caller", "Chief", "Lyft", "MLB",
    "City of Philadelphia", "Grubb Properties", "Beam Suntory", "Signpost", "ApplyBoard", "Perpay", "Sumo Logic",
    "Yubico", "Duo Security", "KyotoCooling", "The Wally Shop", "Lev", "Kindbody", "Paper", "JW Player", "Trimble",
    "Marqeta", "Sealed, Inc", "Bitso", "AssessFirst", "Dooly", "UnitedHealth Group", "Citizens", "Black Girl Sunscreen",
    "Model N", "SOLTECH", "Eze Castle Integration", "Lighthouse Academies", "Alion Science and Technology",
    "Microdesk, Inc.", "Visa", "Kin Insurance", "Inflection", "CrossBorder Solutions", "POLITICO Europe", "Meero",
    "Maven Recruiting Group", "Naturalicious", "Bixal", "Salesforce", "State Street", "The Boeing Company",
    "Bristol Myers Squibb", "Kimberly-Clark", "PAX Labs", "The Execu|Search Group", "Percepta LLC", "Neverware Inc.",
    "Paperless Post", "Classical Charter Schools", "Miro", "Calendly", "Globalization Partners",
    "U.S. Department of State", "Promenade Group", "Hopin", "DHI Group, Inc.", "BlueTriton", "SelectQuote",
    "Northwell Health", "Wistia", "Spire Collective", "Cenduit", "Colonial Electric", "InterVenn Biosciences", "Acast",
    "SP Industries", "Reliable Robotics", "Hootsuite", "Royal Caribbean Group", "Assurance",
    "SEO (SPONSORS FOR EDUCATIONAL OPPORTUNITY, INC)", "Opentrons", "Rapid Micro Biosystems", "Sutherland", "Arcadia",
    "Bounteous", "Kernel", "Spectrum", "March of Dimes", "SUSE", "Floating Point Group", "Highnote", "NEXT Insurance",
    "Yieldstreet Inc.", "Availity", "General Motors", "GameChanger", "Appian", "Portland Public Schools", "DaVita",
    "Nifty’s Inc", "Protective Life", "Discord", "Advocate Aurora Health", "Kafene", "Kiva", "Nitro, Inc.", "Ardoq",
    "EarnUp Inc", "Klarna", "Booster", "Allovue", "Qlik", "GE Power", "UnitedMasters", "All Web Leads Inc.", "Niantic",
    "Bright Cellars", "TikTok", "Lucid", "Health-E Commerce", "GitLab", "Tapingo", "Coca-Cola", "Silvertree",
    "Intelliware Development", "Capital One", "NIKE, Inc.", "Backcountry", "Food52", "Engine No. 1", "Stride",
    "Kairos Power", "Medium", "Growing Up Green Charter Schools", "Cobalt", "Cleveland Research Company", "KOHO",
    "Chambers Theory Property Management", "Kinesso", "Framestore", "ProQuest", "Boundless Immigration",
    "Kaplow Communications", "Teaching Strategies", "LuckyTruck", "Lord Abbett", "Ford Motor Company",
    "Seagull Scientific", "Boom Lab", "Aparavi", "Tipico - North America", "Airbnb", "Propel Schools", "Deloitte",
    "Fundbox", "SoundCloud", "Inline Plastics", "Zeta Charter Schools", "Sonatype Inc", "Carta", "Atmosphere",
    "Bankjoy", "Andie", "Covius", "DoorDash", "Nanit", "Infogrid", "Q4", "Pie Insurance", "Appfire", "Hero",
    "Bamboo Health", "Cash App", "RapidSOS", "Boston Consulting Group", "Splice", "Samba TV", "Galileo Health",
    "Enlitic", "Kinaxis", "LogicGate", "Democracy Prep Public Schools", "EF Education First", "CultureIQ", "Upside",
    "Relay", "Waldo", "ModernLoop", "KinderCare Learning Companies", "Wells Fargo", "WSGR", "LogRocket", "PVH",
    "City of Fort Worth", "Abaco Systems", "Drillinginfo", "Summit Public Schools", "NextCapital", "souk + SEPIA",
    "Transportation Security Administration", "Wunderkind", "Goldman Sachs", "CSAA Insurance Group", "Addteq",
    "Wayfair", "CareMessage", "Terrapin Beer", "Pabst Brewing Company", "The Kennedy Center", "Upwork", "InfoCision",
    "HED", "Workiva", "Comscore", "Sanofi U.S.", "Consumer Reports", "Addison Group", "Castor", "Aramark",
    "JustFix.nyc", "Livestream", "Subaru of America", "Labatt Breweries of Canada", "eMoney", "Some Spider Studios",
    "Uniregistry", "mParticle", "Tophatter", "Pegasystems", "Electric", "GutCheck", "HomeAdvisor",
    "NeuroLeadership Institute", "Squarespace", "Picture Motion", "Coda", "Teamsnap", "Veterinary Specialty Center",
    "Peloton", "Hinge Health", "Fisher Investments", "Funko", "Gametime", "YipitData", "CommonBond",
    "State of Connecticut", "ServiceTitan", "Quicken Loans", "Shopkick", "84.51°", "Helium Health", "Ellevest",
    "Huntress", "Lyric", "Juniper Square", "Yotpo", "Dime Community Bank", "EcoVadis", "Galileo", "Enterprise Holdings",
    "Sosemo", "Brilla Public Charter Schools", "Bluecore", "Susco", "Skillz", "Tile, Inc.",
    "TELUS International AI Inc.", "monday.com", "Personal Capital", "Predata", "Dialpad",
    "Black Girl Ventures Foundation", "Depop", "WW (WeightWatchers)", "Success Academy Charter Schools",
    "KDM Engineering", "PulteGroup", "HCSC", "MUFG", "Discover", "FanDuel", "Edwards Lifesciences", "SmartNews",
    "Atlassian", "Checkout.com", "First Media", "Magic Ears Official", "Sound Credit Union", "iRhythm Technologies",
    "LeafLink", "Jim Koons Automotive", "Ironwood Pharmaceuticals", "USA TODAY NETWORK", "NTT DATA Services", "Grubhub",
    "Accolade", "Cansel", "Open Society Foundations", "LifeWeb 360", "Lincoln Center for the Performing Arts",
    "Salamander Hotels & Resorts", "City of Hope", "Triplebyte", "PGAV Destinations", "Logz.io", "Rapid7", "Noom",
    "Urban Bush Women", "Red Frog Events", "Point B", "Ahold Delhaize", "JUUL Labs", "Rescale", "Earnin",
    "Oscar Health", "BRICK Education Network", "Immersive Labs", "Liftoff", "KeepTruckin", "IMAX", "Clearlink",
    "San Francisco Chronicle", "Quartet", "Aptean", "Verbit", "MuseDev", "Itemize", "Appcues", "Dynatrace", "Kforce",
    "Signavio", "Q-Centrix", "Genesys", "Wounded Warrior Project", "Medallia", "Lazard", "Panorama Education",
    "Advia Credit Union", "Cornerstone OnDemand", "Fremantle", "LRN", "Ribbon", "Brown Smith Wallace", "BuildASign",
    "Merck", "Cognite", "SmartBear", "Thomson Reuters", "IDSS", "Udemy", "Boxed", "Fetch Robotics", "HouseCanary",
    "FreshDirect & FoodKick", "Patreon", "Aetion", "Nuvera Life Science Consulting", "Vanguard", "Hometeam",
    "RoadBotics", "Yello", "Consumers Credit Union", "SICK", "Siemens", "Uncommon Schools", "True Value Company",
    "Black Mountain", "London Computer Systems", "Rainforest QA", "Bionic", "Creative Office Pavilion",
    "Hudson River Trading", "TASC", "HireStrategy", "Progressive Insurance", "RB", "Pluralsight", "Atrium", "McKinsey",
    "BrainPOP", "Dealnews", "Johnson & Johnson", "The Knot Worldwide", "WAXIE Sanitary Supply", "Augury", "thredUP",
    "The Washington Post", "William Grant & Sons", "Equinox", "Sephora", "Veritas Health", "PEAK Technical Staffing",
    "The Equity Project Charter School", "Hanna Andersson", "Marsh & McLennan Companies", "Kepler Group", "KETTLER",
    "Bizzabo", "National Aquarium", "Thryv", "MovingWorlds", "Walgreens", "Dia&Co", "MM.LaFleur", "Kaleidoscope",
    "Zoovu", "Verizon Communications", "Stephen Gould", "Agoda", "Reddit", "SmileDirectClub",
    "Johns Hopkins Applied Physics Laboratory", "Cinemark", "Duolingo", "TE Connectivity", "Year Up",
    "Collective Health", "Reverb", "Socure", "TransUnion", "Dormify", "Cello Health Insight", "Earnest Research",
    "UNTUCKit", "GoCanvas", "NPR", "Leanplum", "Ameriflex", "Integrative Nutrition", "Quizlet", "Trunk Club", "Axios",
    "Expel", "Label Insight", "Condé Nast", "Twitch", "Frontline Education", "The Meet Group", "Walmart",
    "Epic Insurance Brokers and Consultants", "Fannie Mae", "Factual", "Chick-fil-A", "Invisibly",
    "Manhattan Associates", "Plante Moran", "TEAGUE", "FloQast", "Impact Makers", "Small Girls PR", "ConsenSys",
    "FDM Group", "Headway", "Stryker", "Rust-Oleum", "HotelTonight", "Radware", "Prudential", "Balsam Brands", "Pep",
    "Roblox", "GEICO", "Datadog", "Convene", "Shutterstock", "Memorial Sloan Kettering Cancer Center", "Comcast",
    "Sabra Dipping Company", "Pluto TV", "TripleLift", "Nerdery", "Mosaic", "Ceterus", "Samsung NEXT",
    "Bridgestone Americas", "d’aprile properties", "1-800 Contacts", "Goodwill", "Blizzard Entertainment", "Simplee",
    "Logix Federal Credit Union", "MDA", "Digital Air Strike", "Caesars Entertainment", "Entertainment One", "Planet",
    "Bird", "Big Fish Games", "AAA Club Alliance", "NewsCred", "PrintFleet", "TripAdvisor", "Network for Good",
    "Epsilon", "Atchley & Associates", "DMC Atlanta", "Deutsche Bank", "Global Endowment Management", "F5 Networks",
    "PCORI", "Scality", "Hu Products", "Lithium", "Bankers Healthcare Group", "Accruent", "Social Solutions", "Botify",
    "Brilliant Earth", "Dun & Bradstreet", "Dolby", "AppNexus", "Dealer-FX", "Amrock", "NEP", "Intuit", "Fivestars",
    "Hearst Autos", "Federal Reserve Bank of Cleveland", "Cree", "Baylis Medical", "Acumed", "Qkids",
    "Digital Media Solutions", "Scale AI", "Bluebeam", "Storyblocks", "Village Capital", "MealPal", "Argo Group",
    "Players' Lounge", "Symetra Life Insurance Company", "Philips", "Propeller Consulting", "Stash",
    "Seattle Children's", "BuildingConnected", "FLACS", "Bombas", "BetterUp", "MSCI", "Amperity", "Candescent Health",
    "Yieldmo", "TaskUs", "Virta", "Cars.com", "McMaster-Carr", "Bridgespan", "SXSW", "Intapp", "Zoosk",
    "Champion Realty", "Wix", "Plato Learning", "MAANA", "Meritage Homes", "VMware Carbon Black", "Selina", "Andela",
    "FiscalNote", "G5", "Everyday Health Group", "DTCC", "Launchmetrics", "Yelp", "FINRA", "Lime", "Viventium",
    "McGraw Hill", "Famous Supply", "Graham Technologies", "Aira", "Esusu Financial, Inc.", "Formstack", "Teampay",
    "TripActions", "Wealthfront", "ViacomCBS Streaming", "Nectar Communications", "C.H. Robinson", "Bullhorn, Inc.",
    "Alation", "Clover", "Biz2Credit Inc.", "SpotX", "TS Imagine", "Bishop Fox", "Murad", "Outbrain", "Hilton", "PTFS",
    "Publix", "City National Bank", "CURLS", "The Linux Foundation", "Sprinklr", "Robinhood", "Pinterest", "Mad*Pow",
    "Paychex", "Take-Two Interactive Software", "TextNow", "Samsung Electronics America", "Shopify", "Healthfirst",
    "VSCO", "Tory Burch", "Wind River", "Jumio", "Bozzuto", "Good Apple", "Dell Technologies", "Simplifeye",
    "Bank of America", "Spencer Stuart", "Outdoor Voices", "Getty Images", "Invoice Cloud, Inc.", "Federated Wireless",
    "CreatorIQ", "Superhuman", "Colgate University", "Skyepoint Decisions", "Natera", "Colorado Insurance",
    "Wilton Brands", "Flatiron School", "Glossier", "The Medici Group", "Thycotic",
    "Keller Williams Realty International", "NetApp", "Remote", "ReCharge Payments", "Carewell", "Freedom Mortgage",
    "Enova", "DigitalOcean", "First Western", "Testfit", "Invitae", "ASCAP", "Indigo", "Caribbean Development Bank",
    "Madison Logic", "N26", "Strategic Mobility Group", "Aerospace", "GSK", "CafePress", "Smartronix", "Tough Mudder",
    "STATS", "MediaRadar", "Asurion", "First Citizens Bank", "Banfield Pet Hospital", "iPipeline", "Laurel Road",
    "Chobani", "Cresco Labs", "Uber", "Braintree", "Pandora", "Instacart", "Living Spaces", "Mixpanel", "Logic20/20",
    "Babylist", "HealthcareSource", "Synapse", "Rain Bird", "Repeat Roses", "Illumio", "Alto Pharmacy",
    "The Headfirst Companies", "Human Ventures", "Shift", "Schoology", "DentalOne Partners", "Appear Here", "REQ",
    "COUNTRY Financial", "Nestio", "true[X]", "Pilot", "eMarketer", "State Farm", "PayPal", "Stop & Shop",
    "Policygenius", "Scotiabank", "The Home Depot", "Cesium", "GroundTruth", "SoundHound, Inc.", "Lockheed Martin",
    "Too Good To Go", "Tribune Publishing", "SEI", "Elysium Health", "Totango", "Headspace", "Printfly", "Opendoor",
    "Food Bank For New York City", "iVision", "IGS", "Fundera", "Affirm", "Taco Bell", "American Express", "Esri",
    "Allbirds", "Xperi", "Propel", "GLG", "Audible", "BRPH", "Avis", "Intermex", "Gartner", "VICE Media",
    "Medical Guardian", "UKG", "MarketAxess", "Dow Jones", "HelloSign", "Instrumentation Laboratory", "CVS Health",
    "SimplePractice", "Kohl's", "Glaukos Corporation", "TOMS", "quip", "IQ Solutions", "BlackLine", "Weber Metals",
    "Allstate", "Macquarie Group", "Financial Finesse", "Elastic", "Restaurant365", "Point", "Blueprint Medicines",
    "Meta", "Charles Schwab", "Here Technologies", "Cummins", "Lemonade", "Pernod Ricard USA", "Netlify", "Grabango",
    "Collins Aerospace", "Symphony", "Collibra", "Global Industrial", "Banner Health", "Zwift", "Cerner",
    "Rakuten Americas", "Kroger", "Bazaarvoice", "GeoBlue", "Exelon", "Asana", "Great Oaks Charter Schools", "KnowBe4",
    "Skift", "Nielsen", "Host", "Cloudflare", "Satellite Healthcare", "Anvyl", "Quantcast", "Tradeweb", "AppFolio",
    "A Place For Mom", "PetMeds", "Mental Health Center of Denver", "VSA Partners", "BIC", "HUB International", "VTS",
    "Guidepoint", "ProviderTrust", "IEX Group", "Wandering Bear Coffee", "Anheuser-Busch", "OFX", "Seesaw",
    "Warby Parker", "McDonald’s", "Adaptive Financial Consulting", "Mattel", "World 50", "TRIOSE", "Zynga", "Accenture",
    "Alcon", "US Mobile", "OpenMarket", "Avanade", "Blinds.com", "Giant/Martin's", "Tuft & Needle", "Atos", "The Muse",
    "Airtable", "Windsor Communities", "BetterCloud"
  ]

  //const acceptedLevels = ['Entry Level','Mid Level','Senior Level','management','Internship'];

  //const acceptedCategories = ['Accounting','Accounting and Finance','Account Management','Account Management/Customer Success', 'Administration and Office', 'Advertising and Marketing','Animal Care','Arts', 'Business Operations','Cleaning and Facilities','Computer and IT', 'Construction', 'Corporate','Customer Service','Data and Analytics','Data Science','Design','Design and UX','Editor','Education', 'Energy Generation and Mining','Entertainment and Travel Services','Farming and Outdoors','Food and Hospitality Services','Healthcare','HR','Human Resources and Recruitment','Installation, Maintenance, and Repairs','IT','Law','Legal Services','Management', 'Manufacturing and Warehouse','Marketing','Mechanic','Media, PR, and Communications','Mental Health','Nurses','Office Administration','Personal Care and Services','Physical Assistant','Product','Product Management','Project Management','Protective Services','Public Relations','Real Estate','Recruiting','Retail','Sales','Science and Engineering','Social Services','Software Engineer','Software Engineering','Sports, Fitness, and Recreation','Transportation and Logistics','Unknown','UX','Videography','Writer','Writing and Editing']

  // level and location can be null
  const fetchJobs = async (page, location, level) => {
    const response = await fetch(`https://www.themuse.com/api/public/jobs?page=${page}&location=${location}&level=${level}`);
    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }
    const jobs = await response.json();
    setJobs(jobs.results);
    return jobs;
  }

  const fetchJobsByCompany = async (page, company) => { // location, level, &location=${location}&level=${level}
    const response = await fetch(`https://www.themuse.com/api/public/jobs?page=${page}&company=${company}`);
    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }
    const jobs = await response.json();
    setJobs(jobs.results);
    return jobs;
  }

  const fetchJobsOnFirstLoad = async () => {
    const response = await fetch(`https://www.themuse.com/api/public/jobs?page=1`);
    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }
    const jobs = await response.json();
    setJobs(jobs.results)
    return jobs;
  }

  const handlePrevPage = () => {
    setPage(prev => prev - 1)
  }

  const handleNextPage = () => {
    setPage(prev => prev + 1)
  }

  const handlePageNumber = (number) => {
    setPage(number)
  }

  const handleExperienceChange = (e) => {
    setLevel(e.target.value)
  }

  const handleLocationSearch = (e) => {
    e.preventDefault()
    setLocationSearch(e.target.value)
  }

  const handleLocationSubmit = (e) => {
    e.preventDefault()
    // check if input has any value
    if (e.target.previousElementSibling.value) {
      setLocation(encodeURI(locationSearch))
    }
  }

  useEffect(() => {
    fetchJobs(page, location, level)
  }, [page, location, level])

  useEffect(() => {
    fetchJobsByCompany(page, company)
  }, [page, company])

  useEffect(() => {
    fetchJobsOnFirstLoad()
  }, [])

  return (
    <main className="App">
      <div className="logo-wrapper">
        <svg viewBox="-696 488.7 526.6 104.3" width="8em" height="4em" aria-labelledby="logo-title" aria-describedby="logo-desc">
          <title id="logo-title">The Muse Logo</title>
          <desc id="logo-desc">A logo with "the" in white text and "muse" in light blue text.</desc>
          <path d="M-686.5 532.2h-8.5c-.6 0-1-.4-1-1v-12.6c0-.6.4-1 1-1h8c.6 0 1-.4 1-1v-18.1c0-.6.4-1 1-1h15.9c.6 0 1 .4 1 1v19.1h10.7c.6 0 1 .4 1 1v12.6c0 .6-.4 1-1 1h-9.7c-.6 0-1 .4-1 1v28.7c0 12.1 9.5 13.9 14.6 13.9.9 0 1.7-.1 2.2-.1.6-.1 1.1.4 1.1 1v14c0 .5-.4.9-.9 1-1 .1-2.7.3-4.8.3-10.3 0-30.6-3-30.6-27.7v-32.1zm154.4-16.4c21.1 0 32.6 15.5 32.6 34.9 0 2.2-.4 6.8-.4 6.8h-50.8c1.4 13 11 19.8 22.1 19.8 9.6 0 17.3-5.4 19.8-7.5.5-.4 1.2-.3 1.5.3l6.6 11c.2.4.2.9-.2 1.3-2.6 2.3-13.1 10.6-29 10.6-24.4 0-39.6-17.6-39.6-38.6 0-22.7 15.3-38.6 37.4-38.6zm13.8 29.1c-.3-8.8-6.4-14.9-13.9-14.9-9.4 0-16 5.6-18 14.9h31.9z" fill="#FFF"></path>
          <path d="M-255 533.3v-.8c0-5.3-7.9-7.4-12.6-7.4-10.2 0-16.2 3.5-16.2 10.6 0 16.4 40.9 12.6 40.9 36.9 0 12.2-11 20.4-25.6 20.4-16.4 0-25.4-9.5-27.5-12.1-.3-.4-.3-.9 0-1.3l4.3-5.2c.4-.5 1.1-.5 1.5 0 2.3 2.6 9.9 10.1 21.8 10.1 8.2 0 15.4-3.9 15.4-11.6 0-16-40.9-13.1-40.9-36.6 0-13.2 11.3-19.7 26-19.7 7.4 0 22.2 2.9 22.2 13.2v1.8c0 .5-.4.9-.9 1l-8.4.7zm55-16.8c20.1 0 30.6 15.5 30.6 33.6 0 1.7-.3 4.9-.3 4.9h-56c.3 18.4 13.2 29 28.3 29 10.9 0 18.6-6 21.1-8.2.5-.4 1.2-.3 1.5.2l3.7 5.7c.3.4.2 1-.2 1.3-2.5 2.2-12.3 9.9-26.5 9.9-21.6 0-38.2-15.7-38.2-38.2 0-23.8 16.4-38.2 36-38.2zm20.4 30.8c-.6-15.1-9.9-22.5-20.6-22.5-12.1 0-22.7 7.9-25.1 22.5h45.7z" fill="#53B6D0"></path>
          <path d="M-644.8 507.5v-17.8c0-.6.4-1 1-1h7.6c6.8 0 9.8 3 9.8 9.7v25.8c0 3.6-.3 6.2-.3 6.2h.3c3.5-7.1 12.6-14.6 25.3-14.6 16.5 0 25.7 8.5 25.7 28v47.3h-8.6c-6.8 0-9.7-2.9-9.7-9.8v-33.7c0-9-2.5-15-11.7-15-9.7 0-17.2 6.4-19.9 15.3-.9 2.9-1.2 6.1-1.2 9.5v32.8c0 .6-.4 1-1 1h-16.3c-.6 0-1-.4-1-1v-82.7" fill="#FFF"></path>
          <path d="M-368.8 530v-10.8c0-.6.4-1 1-1h.7c6.2 0 8.3 2.6 8.3 8.6V562c0 11.5 1.9 21.7 16 21.7 16.5 0 26.9-14.7 26.9-30.5v-33.9c0-.6.4-1 1-1h7.9c.6 0 1 .4 1 1v71.9h-.8c-6.1 0-8.9-2.6-8.9-8.2v-7.3h-.3c-2.9 7.1-12.2 17.2-28.1 17.2-17.3 0-24.5-9.3-24.5-28.3V530h-.2" fill="#53B6D0"></path>
          <g fill="#53B6D0"><path d="M-489.3 532.3v58.4c0 .6.4 1 1 1h7.9c.6 0 1-.4 1-1v-33.4c0-3.4.3-6.7 1.2-9.7 3.1-11.1 11.9-21.4 23.8-21.4 13.8 0 15.4 10.7 15.4 21.7v43c0 .6.4 1 1 1h7.9c.6 0 1-.4 1-1v-33.6c0-4 .3-7.4 1.3-10.6 3-10.7 12.1-20.6 23.1-20.6 13.4 0 15.8 9.8 15.8 21.7v35.1c0 6.3-.3 8.9 5.9 8.9h3.1c.6 0 1-.4 1-1v-45.5c0-18-6.6-28.3-24.3-28.3-12.3 0-23 8.4-26.9 18.3h-.3c-2.2-12.1-9.2-18.3-22.7-18.3-11.3 0-22.8 8.5-26.4 18.4h-.3s.3-2.3.3-5.2v-3.3c0-5.6.2-8.2-5.9-8.2h-4l.1 13.6z"></path>
            <path d="M-380.1 591.8c-6.2 0-8.9-2.6-8.9-8.9v-35.1c0-11.9-2.5-21.7-15.8-21.7-11 0-20.1 9.9-23.1 20.6-1 3.2-1.3 6.6-1.3 10.6v34.5h-9.9v-44c0-11-1.6-21.7-15.4-21.7-11.9 0-20.7 10.3-23.8 21.4-.9 3-1.2 6.4-1.2 9.7v34.5h-9.9v-61.2c0-2-1.2-3.2-3.2-3.2h-6.1v-8.6h10.2c6.1 0 8.9 2.6 8.9 8.2v3.3c0 2.9-.3 5.2-.3 5.2h.3c3.6-9.9 15.1-18.4 26.4-18.4 13.5 0 20.4 6.2 22.7 18.3h.3c3.9-9.9 14.5-18.3 26.9-18.3 17.7 0 24.3 10.3 24.3 28.3V580"></path>
          </g>
        </svg>
        <span className="fs-36 muse-color jobs-text">Jobs</span>
      </div>
      <div className="form-wrapper">
        <form className="search-form">
          <label htmlFor="company-search" className="sr-only">Company</label>
          <input id="company-search" type="text" placeholder="Search by company" onChange={handleChange} value={companySearch} />
          <button onClick={handleSubmit}>Search</button>
        </form>
      </div>
      <div className="content-wrapper">
        <div>
          <div>
            <form onChange={handleExperienceChange}>
              <fieldset>
                <legend>Experience</legend>
                <input type="radio" id="entry" name="experience" value="Entry Level" />
                <label htmlFor="entry">Entry Level</label><br />
                <input type="radio" id="mid" name="experience" value="Mid Level" />
                <label htmlFor="mid">Mid Level</label><br />
                <input type="radio" id="senior" name="experience" value="Senior Level" />
                <label htmlFor="senior">Senior Level</label><br />
                <input type="radio" id="intern" name="experience" value="Internship" />
                <label htmlFor="intern">Internship</label><br />
              </fieldset>
            </form>
          </div>
          <div>
            <form>
              <label htmlFor="location-search">Location</label>
              <br />
              <input id="location-search" type="text" placeholder="Search City, State/Country" value={locationSearch} onChange={handleLocationSearch} />
              <button className="location-button" onClick={handleLocationSubmit}>Search</button>
            </form>
          </div>
        </div>
        <div>
          {
            jobs.length === 0 ? <p className="no-jobs">No jobs found</p> :
              jobs?.map((job, index) => (
                <article key={index} className="card">
                  <Job job={job} location={location} />
                </article>
              ))
          }
        </div>
      </div>
      <div className="buttons-container">
        <button className="chevron-button" onClick={handlePrevPage} disabled={page === 1}>
          <span className="sr-only">Prev Page</span>
          <svg className="chevron-left" style={{ width: "24px", height: "24px", backgroundColor: "#f6f7fb" }} viewBox="0 0 24 24">
            <path fill="gray" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
          </svg>
        </button>
        <button className="number-button" onClick={() => handlePageNumber(1)}>1</button>
        <button className="number-button" onClick={() => handlePageNumber(2)}>2</button>
        <button className="number-button" onClick={() => handlePageNumber(3)}>3</button>
        <span className="flex">
          <svg style={{ width: "24px", height: "24px", backgroundColor: "#f6f7fb" }} viewBox="0 0 24 24">
            <path fill="gray" d="M16,12A2,2 0 0,1 18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12M10,12A2,2 0 0,1 12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12M4,12A2,2 0 0,1 6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12Z" />
          </svg>
        </span>
        <button className="number-button" onClick={() => handlePageNumber(10)}>10</button>
        <button className="chevron-button" onClick={handleNextPage} disabled={page === 1000}>
          <span className="sr-only">Next Page</span>
          <svg style={{ width: "24px", height: "24px", backgroundColor: "#f6f7fb" }} viewBox="0 0 24 24">
            <path fill="gray" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
          </svg>
        </button>
      </div>
    </main>
  );
}

export default App;