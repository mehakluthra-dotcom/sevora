// Sevora mock data — illustrative listings, not live.
// In production these come from the verified NGO & volunteering database.

window.SEVORA = {
  causes: ["Education","Environment","Animal Welfare","Healthcare","Women Empowerment","Disaster Relief","Elderly Care","Child Welfare"],
  skills: ["Writing","Design","Video Editing","Research","Coding","Teaching","Social Media","Translation","Data Entry","Logistics"],
  opportunities: [
    {id:1, title:"Social Media Volunteer", ngo:"GreenEarth Foundation", cause:"Environment", mode:"online", skills:["Social Media","Design"], hours:4, deadline:"2026-11-15", location:"Remote", verified:true, spots:12, desc:"Help create awareness posts, manage campaigns and track engagement for a tree-planting drive."},
    {id:2, title:"Content Writing Volunteer", ngo:"Shiksha Sangam", cause:"Education", mode:"online", skills:["Writing"], hours:3, deadline:"2026-11-20", location:"Remote", verified:true, spots:20, desc:"Write educational blog posts and fundraising stories in Hindi/English."},
    {id:3, title:"Research Assistant", ngo:"CareForAll", cause:"Healthcare", mode:"online", skills:["Research","Data Entry"], hours:5, deadline:"2026-11-30", location:"Remote", verified:true, spots:8, desc:"Help organize publicly available health resources into verified summaries for NGO staff."},
    {id:4, title:"Graphic Designer", ngo:"Paws & Claws Trust", cause:"Animal Welfare", mode:"online", skills:["Design","Video Editing"], hours:6, deadline:"2026-12-05", location:"Remote", verified:true, spots:5, desc:"Design adoption posters and rescue-awareness creatives."},
    {id:5, title:"Web Dev Volunteer", ngo:"TechForGood India", cause:"Education", mode:"online", skills:["Coding"], hours:8, deadline:"2026-12-12", location:"Remote", verified:true, spots:4, desc:"Build accessible pages for an NGO's donation portal."},
    {id:6, title:"Translation Volunteer", ngo:"Udaan Women Collective", cause:"Women Empowerment", mode:"online", skills:["Translation","Writing"], hours:2, deadline:"2026-11-10", location:"Remote", verified:true, spots:15, desc:"Translate awareness material across Indian languages (30-min tasks available)."},
    {id:7, title:"Beach Cleanup Drive", ngo:"GreenEarth Foundation", cause:"Environment", mode:"offline", skills:["Logistics"], hours:3, deadline:"2026-11-08", location:"Mumbai", verified:true, spots:40, desc:"Join a Sunday cleanup along Juhu beach with supplies provided."},
    {id:8, title:"Teaching Volunteer", ngo:"Shiksha Sangam", cause:"Education", mode:"offline", skills:["Teaching"], hours:4, deadline:"2026-11-22", location:"Delhi", verified:true, spots:10, desc:"Teach weekend classes to underprivileged children."},
    {id:9, title:"Elderly Care Visit", ngo:"Sahayata Seniors", cause:"Elderly Care", mode:"offline", skills:["Teaching"], hours:2, deadline:"2026-11-12", location:"Bengaluru", verified:false, spots:6, desc:"Companionship visits to elderly care homes (verification in progress)."},
    {id:10, title:"Disaster Relief Packing", ngo:"ReliefNow", cause:"Disaster Relief", mode:"offline", skills:["Logistics"], hours:5, deadline:"2026-12-01", location:"Pune", verified:true, spots:30, desc:"Pack and sort relief kits at the warehouse."},
    {id:11, title:"Animal Rescue Helper", ngo:"Paws & Claws Trust", cause:"Animal Welfare", mode:"offline", skills:["Logistics"], hours:4, deadline:"2026-11-18", location:"Hyderabad", verified:true, spots:12, desc:"Assist at rescue shelter on weekends."},
    {id:12, title:"Short Task: Tag Photos", ngo:"GreenEarth Foundation", cause:"Environment", mode:"online", skills:["Data Entry"], hours:0.5, deadline:"2026-12-31", location:"Remote", verified:true, spots:99, desc:"30-minute micro-task: tag and categorize tree-planting photos."},
  ],
  events: [
    {id:1, title:"Green Delhi Plantation Drive", ngo:"GreenEarth Foundation", date:"15 Nov 2026", location:"Delhi", mode:"offline", price:0, cover:"🌱"},
    {id:2, title:"Skill Workshop: Design for NGOs", ngo:"TechForGood India", date:"22 Nov 2026", location:"Online", mode:"online", price:0, cover:"🎨"},
    {id:3, title:"Charity Gala 2026", ngo:"CareForAll", date:"5 Dec 2026", location:"Bengaluru", mode:"offline", price:500, cover:" charity gala".trim()},
    {id:4, title:"Animal Adoption Mela", ngo:"Paws & Claws Trust", date:"10 Dec 2026", location:"Hyderabad", mode:"offline", price:0, cover:"🐾"},
  ],
  ngos: [
    {name:"GreenEarth Foundation", cause:"Environment", verified:true, founded:2015, location:"Mumbai", needs:["Volunteers","Donations"], desc:"Plantation, cleanups and climate awareness campaigns."},
    {name:"Shiksha Sangam", cause:"Education", verified:true, founded:2012, location:"Delhi", needs:["Volunteers","Mentors"], desc:"Education for underprivileged children."},
    {name:"Paws & Claws Trust", cause:"Animal Welfare", verified:true, founded:2018, location:"Hyderabad", needs:["Volunteers","Fosters","Donations"], desc:"Animal rescue and adoption."},
    {name:"CareForAll", cause:"Healthcare", verified:true, founded:2016, location:"Bengaluru", needs:["Donations","Volunteers"], desc:"Healthcare access for low-income families."},
    {name:"Udaan Women Collective", cause:"Women Empowerment", verified:true, founded:2019, location:"Pune", needs:["Volunteers","Mentors"], desc:"Skill training and safety awareness for women."},
    {name:"Sahayata Seniors", cause:"Elderly Care", verified:false, founded:2020, location:"Bengaluru", needs:["Volunteers"], desc:"Companionship for elderly (verification in progress)."},
    {name:"ReliefNow", cause:"Disaster Relief", verified:true, founded:2017, location:"Pune", needs:["Volunteers","Donations","Logistics"], desc:"Disaster response and relief distribution."},
  ],
  campaigns: [
    {id:1, title:"Plant 10,000 Trees", ngo:"GreenEarth Foundation", goal:500000, raised:320000, purpose:"Fund saplings, transport and plantation events across 5 cities.", updates:["1,200 saplings planted in pilot city.","New partner nursery onboarded."]},
    {id:2, title:"School Kit Drive", ngo:"Shiksha Sangam", goal:200000, raised:145000, purpose:"Provide school kits to 1,000 children before the academic year.", updates:[" Kits packed for 420 students."]},
    {id:3, title:"Rescue & Rehab Fund", ngo:"Paws & Claws Trust", goal:300000, raised:90000, purpose:"Medical care, food and shelter for rescued animals.", updates:["New shelter wing under construction."]},
    {id:4, title:"Elderly Care Essentials", ngo:"Sahayata Seniors", goal:120000, raised:40000, purpose:"Essential supplies and activity kits for care homes.", updates:["Pending NGO verification; receipts on confirmation."]},
  ],
  skillsCatalog: [
    {name:"Graphic Design", icon:"🎨", tasks:["Posters","Social media creatives","Brand kits"]},
    {name:"Video Editing", icon:"🎬", tasks:["Reels","Awareness videos","Event highlights"]},
    {name:"Content Writing", icon:"✍️", tasks:["Blogs","Fundraising stories","Newsletters"]},
    {name:"Research", icon:"🔍", tasks:["Resource compilation","Data summaries","Fact-checking"]},
    {name:"Translation", icon:"🌐", tasks:["Multilingual documents","Subtitle translation"]},
    {name:"Social Media", icon:"📣", tasks:["Campaign planning","Engagement tracking"]},
    {name:"Coding", icon:"💻", tasks:["Websites","Forms","Accessibility fixes"]},
    {name:"Digital Marketing", icon:"📈", tasks:["SEO","Email campaigns","Analytics"]},
    {name:"Online Tutoring", icon:"📚", tasks:["Subject mentoring","Exam prep support"]},
    {name:"Mentoring", icon:"🤝", tasks:["Career guidance","Skill coaching"]},
  ],
  reports: [
    {id:"R-1042", type:"Injured animal", location:"Sector 18, Noida", status:"review", updated:"2h ago"},
    {id:"R-1041", type:"Person needs shelter", location:"Chennai Central", status:"routed", updated:"1d ago"},
    {id:"R-1040", type:"Abandoned animal", location:"Koramangala, Bengaluru", status:"resolved", updated:"3d ago"},
  ],
  portfolio: {
    user: "Mehak Luthra",
    role: "Student Volunteer · Delhi",
    hours: 26,
    tasks: 7,
    certs: 3,
    rating: 4.8,
    skills: ["Writing","Research","Social Media","Translation"],
    completed: [
      {title:"Content writer for Shiksha Sangam", hours:6, status:"cert issued"},
      {title:"Research assistant — CareForAll", hours:5, status:"cert issued"},
      {title:"Social media support — GreenEarth", hours:4, status:"cert issued"},
      {title:"Translation (Hindi→English)", hours:2, status:"pending NGO confirm"},
    ],
    certs: [
      {title:"Verified Volunteering Certificate", issuer:"Shiksha Sangam", date:"Oct 2026", hours:6},
      {title:"Verified Volunteering Certificate", issuer:"CareForAll", date:"Sep 2026", hours:5},
      {title:"Verified Volunteering Certificate", issuer:"GreenEarth Foundation", date:"Aug 2026", hours:4},
    ]
  },
  impact: {
    volunteers: 12480, hours: 98420, campaigns: 42, ngos: 316, tasks: 5670, reports: 892
  },
  impactMonths: [420,560,610,720,880,950,1100,1240,1380,1520,1680,1900],
  badges: ["Verified NGO","College Partner","Gold Volunteer","Donor Tier 2","Reliability A+"],
};
