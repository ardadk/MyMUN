const chatOptions = {
    // fallback başlangıç opsiyonları
    start: [
      { text: "Savaşa girmeyeceğim", next: "peace" },
      { text: "C ülkesini destekliyorum", next: "supportC" },
      { text: "D ülkesini suçluyorum", next: "blameD" }
    ],
  
    // 🌍 3. Dünya Savaşı
    "3. dünya savaşı çıktı_round1": [
      { text: "Savaşı durdurmak için çağrı yapıyorum", next: "peaceCall" },
      { text: "Müttefik arıyorum", next: "seekAllies" },
      { text: "Savunma bütçemi artırıyorum", next: "defenseBoost" }
    ],
    "3. dünya savaşı çıktı_round2": [
      { text: "Barış görüşmeleri düzenleyelim", next: "summitCall" },
      { text: "Sivil kayıplar endişe verici", next: "civilianConcern" },
      { text: "Savaş suçlarını kınıyorum", next: "warCrime" }
    ],
    "3. dünya savaşı çıktı_round3": [
      { text: "Ateşkes teklif ediyorum", next: "ceasefire" },
      { text: "Tarafsız kalmayı tercih ediyorum", next: "neutrality" },
      { text: "Silah ihracatını durduruyorum", next: "embargo" }
    ],
    "3. dünya savaşı çıktı_round4": [
      { text: "Askeri üsleri kapatıyorum", next: "baseClosure" },
      { text: "Birleşmiş Milletler’e çağrı yapıyorum", next: "unRequest" },
      { text: "Nükleer silahlanmayı reddediyoruz", next: "nukeRefuse" }
    ],
    "3. dünya savaşı çıktı_round5": [
      { text: "Barış anlaşması imzalamaya hazırım", next: "peaceSign" },
      { text: "Uluslararası güvenlik gücü öneriyorum", next: "intPeaceForce" },
      { text: "Ekonomik yardım teklif ediyorum", next: "rebuildAid" }
    ],
  
    // 💰 Ekonomik Kriz
    "Büyük bir ekonomik kriz yaşanıyor_round1": [
      { text: "Uluslararası yardım talep ediyorum", next: "aidRequest" },
      { text: "Ekonomik reform planı açıklıyorum", next: "reformPlan" },
      { text: "İstikrar fonu oluşturulmalı", next: "stabilityFund" }
    ],
    "Büyük bir ekonomik kriz yaşanıyor_round2": [
      { text: "Vergileri yeniden düzenliyoruz", next: "taxAdjust" },
      { text: "İstihdam paketini devreye sokuyoruz", next: "jobsPlan" },
      { text: "Yatırımcı güvenini artırmak istiyoruz", next: "investorAppeal" }
    ],
    "Büyük bir ekonomik kriz yaşanıyor_round3": [
      { text: "Merkez bankası faizleri değiştirdi", next: "rateChange" },
      { text: "Yolsuzlukla mücadele ediyoruz", next: "antiCorruption" },
      { text: "İthalatı geçici olarak sınırlandırıyoruz", next: "importControl" }
    ],
    "Büyük bir ekonomik kriz yaşanıyor_round4": [
      { text: "Yabancı yatırımlara teşvik veriyoruz", next: "fdiSupport" },
      { text: "Kamu harcamalarını azaltıyoruz", next: "cutSpending" },
      { text: "Gıda ve enerji sübvansiyonu sağlıyoruz", next: "subsidies" }
    ],
    "Büyük bir ekonomik kriz yaşanıyor_round5": [
      { text: "Bölgesel ekonomik işbirliğine açığız", next: "regionalTrade" },
      { text: "IMF ile görüşmelere başladık", next: "imfTalks" },
      { text: "Krizden çıkış stratejimizi açıklıyoruz", next: "exitPlan" }
    ],
  
    // 🪖 İç Savaş
    "İç savaş başladı_round1": [
      { text: "Barış görüşmeleri başlatıyorum", next: "civilPeace" },
      { text: "İnsani yardım çağrısı yapıyorum", next: "humanitarianAppeal" },
      { text: "BM müdahalesini destekliyorum", next: "unSupport" }
    ],
    "İç savaş başladı_round2": [
      { text: "Ateşkes çağrısı yapıyorum", next: "ceasefireCall" },
      { text: "Sınır güvenliğini artırıyoruz", next: "borderSecurity" },
      { text: "Mültecileri kabul etmeye hazırız", next: "refugeesWelcome" }
    ],
    "İç savaş başladı_round3": [
      { text: "Taraflar arası diyalog öneriyoruz", next: "dialogueSupport" },
      { text: "Barış koruma gücü gönderilsin", next: "peaceForce" },
      { text: "Silahlı grupları kınıyoruz", next: "condemnMilitia" }
    ],
    "İç savaş başladı_round4": [
      { text: "Af ilan ettik", next: "amnesty" },
      { text: "Seçim yapılması için zemin hazırlanmalı", next: "electionPlan" },
      { text: "Tarafsız arabulucu talep ediyoruz", next: "mediator" }
    ],
    "İç savaş başladı_round5": [
      { text: "Yeniden yapılanma planı açıklıyoruz", next: "restructuring" },
      { text: "İzleme komisyonu kurulmalı", next: "monitoringBody" },
      { text: "Geçici hükümeti destekliyoruz", next: "transitionalGov" }
    ],
    "Küresel ısınma nedeniyle kıtlık var_round1": [
    { text: "Tarım destek fonu kurulsun", next: "agriFund" },
    { text: "İklim konferansı düzenleyelim", next: "climateSummit" },
    { text: "Gıda yardımı bekliyoruz", next: "foodRelief" }
  ],
  "Küresel ısınma nedeniyle kıtlık var_round2": [
    { text: "Su kaynakları ortak kullanılmalı", next: "sharedWater" },
    { text: "Kıtlık bölgesine yardım gönderiyoruz", next: "sendAid" },
    { text: "Toprak reformu uyguluyoruz", next: "landReform" }
  ],
  "Küresel ısınma nedeniyle kıtlık var_round3": [
    { text: "Gıda ihracatını durdurduk", next: "exportBan" },
    { text: "Tarımsal Ar-Ge projeleri başlattık", next: "agriResearch" },
    { text: "Küresel dayanışma çağrısı yapıyorum", next: "climateSolidarity" }
  ],
  "Küresel ısınma nedeniyle kıtlık var_round4": [
    { text: "Çiftçilere sübvansiyon sağlıyoruz", next: "farmerSupport" },
    { text: "Organik tarımı teşvik ediyoruz", next: "organicBoost" },
    { text: "İklim göçmenleri için hazırlık yapıyoruz", next: "climateRefugees" }
  ],
  "Küresel ısınma nedeniyle kıtlık var_round5": [
    { text: "Kıtlığa karşı küresel fon kurulsun", next: "famineFund" },
    { text: "Tohum bankaları kurulmalı", next: "seedBank" },
    { text: "İklim anlaşmasını imzalamaya hazırız", next: "signClimateDeal" }
  ],
  "Ülkenizde salgın hastalık yayılıyor_round1": [
    { text: "Acil sağlık yardımı istiyoruz", next: "medicalHelp" },
    { text: "Sınırlarımızı kapattık", next: "borderClose" },
    { text: "Aşı paylaşımı talep ediyoruz", next: "vaccineAsk" }
  ],
  "Ülkenizde salgın hastalık yayılıyor_round2": [
    { text: "Acil durum ilan ettik", next: "stateEmergency" },
    { text: "Sağlık sistemini güçlendiriyoruz", next: "healthBoost" },
    { text: "Toplu etkinlikleri iptal ettik", next: "eventBan" }
  ],
  "Ülkenizde salgın hastalık yayılıyor_round3": [
    { text: "Salgın kaynağı araştırılıyor", next: "originInvestigate" },
    { text: "Uluslararası sağlık protokolü öneriyoruz", next: "healthProtocol" },
    { text: "Halkı bilgilendirme kampanyası başlattık", next: "infoCampaign" }
  ],
  "Ülkenizde salgın hastalık yayılıyor_round4": [
    { text: "Uluslararası sağlık gücü gönderilsin", next: "healthForces" },
    { text: "Mobil klinikler kuruluyor", next: "mobileClinic" },
    { text: "Karantina bölgeleri oluşturduk", next: "quarantineZones" }
  ],
  "Ülkenizde salgın hastalık yayılıyor_round5": [
    { text: "Salgın sona erdi, yeniden yapılanıyoruz", next: "recovery" },
    { text: "Pandemiye karşı kalıcı fon öneriyoruz", next: "pandemicFund" },
    { text: "Aşı üretim kapasitemizi artırdık", next: "vaccineFactory" }
  ],
  "Darbe girişimi yaşandı_round1": [
    { text: "Demokrasimizi koruyacağız", next: "defendDemocracy" },
    { text: "Halkımıza sükunet çağrısı yapıyorum", next: "callCalm" },
    { text: "Darbe girişimini kınıyoruz", next: "condemnCoup" }
  ],
  "Darbe girişimi yaşandı_round2": [
    { text: "Sorumlular adalete teslim edilecek", next: "justice" },
    { text: "Demokratik kurumlarımız çalışıyor", next: "democracyWorks" },
    { text: "Ulusal birlik çağrısı yapıyorum", next: "nationalUnity" }
  ],
  "Darbe girişimi yaşandı_round3": [
    { text: "Seçim takvimi güncellendi", next: "newElections" },
    { text: "Medya özgürlüğü garanti altındadır", next: "pressFreedom" },
    { text: "Uluslararası gözlemcilere açığız", next: "openToObservers" }
  ],
  "Darbe girişimi yaşandı_round4": [
    { text: "Güvenlik reformu başlatıyoruz", next: "securityReform" },
    { text: "Ordunun siyasete müdahalesi kabul edilemez", next: "noMilitary" },
    { text: "Yeni anayasa taslağı hazırlıyoruz", next: "newConstitution" }
  ],
  "Darbe girişimi yaşandı_round5": [
    { text: "Geçici hükümet görev başında", next: "interimGov" },
    { text: "Demokrasi kazandı, yolumuza devam ediyoruz", next: "democracyWins" },
    { text: "Ulusal uzlaşı sağlandı", next: "nationalConsensus" }
  ],
  "Enerji kaynakları tükendi_round1": [
    { text: "Nükleer enerjiye geçiş planlıyoruz", next: "nuclearPlan" },
    { text: "Yenilenebilir kaynaklara yatırım yapacağız", next: "renewablePush" },
    { text: "Enerji ithalatı için görüşme yapıyoruz", next: "energyDeal" }
  ],
  "Enerji kaynakları tükendi_round2": [
    { text: "Elektrik kesintileri başladı", next: "blackouts" },
    { text: "Kömür rezervlerini devreye aldık", next: "coalBackup" },
    { text: "Enerji tasarrufu kampanyası başlattık", next: "saveEnergy" }
  ],
  "Enerji kaynakları tükendi_round3": [
    { text: "Uluslararası enerji zirvesi öneriyoruz", next: "energySummit" },
    { text: "Doğalgaz hattı inşa ediyoruz", next: "gasPipeline" },
    { text: "Enerji ithalat vergileri kaldırıldı", next: "energyTaxCut" }
  ],
  "Enerji kaynakları tükendi_round4": [
    { text: "Yeni rüzgar santralleri açtık", next: "windFarms" },
    { text: "Güneş enerjisi projeleri başlattık", next: "solarStart" },
    { text: "Nükleer enerji yatırımı yapıyoruz", next: "nuclearBuild" }
  ],
  "Enerji kaynakları tükendi_round5": [
    { text: "Enerji krizini aştık, dışa bağımlılık azaldı", next: "independence" },
    { text: "Küresel enerji iş birliği öneriyoruz", next: "energyUnion" },
    { text: "Yeşil ekonomi için destek bekliyoruz", next: "greenFund" }
  ],
  "Ulusal internet ağı çöktü_round1": [
    { text: "Acil siber güvenlik zirvesi öneriyorum", next: "cyberSummit" },
    { text: "Uydu destekli iletişim kuruyoruz", next: "satelliteComm" },
    { text: "Siber saldırıya uğradık, kınıyoruz", next: "cyberCondemn" }
  ],
  "Ulusal internet ağı çöktü_round2": [
    { text: "Siber güvenlik uzmanları görevlendirildi", next: "cyberTaskforce" },
    { text: "İnternet altyapısını yeniliyoruz", next: "infraUpgrade" },
    { text: "Ulusal veri merkezleri kurulacak", next: "dataCenters" }
  ],
  "Ulusal internet ağı çöktü_round3": [
    { text: "Saldırgan tarafları belirledik", next: "identifyHackers" },
    { text: "İnternet kesintisi halka duyuruldu", next: "publicNotice" },
    { text: "Mobil şebekeleri aktif hale getirdik", next: "mobileFallback" }
  ],
  "Ulusal internet ağı çöktü_round4": [
    { text: "Ulusal yazılım geliştiriyoruz", next: "localSoftware" },
    { text: "Uluslararası destek çağrısı yaptık", next: "cyberSupport" },
    { text: "Siber ordu kurmayı planlıyoruz", next: "cyberArmy" }
  ],
  "Ulusal internet ağı çöktü_round5": [
    { text: "Altyapı onarıldı, sistem normale döndü", next: "systemRestored" },
    { text: "Siber saldırı engellendi", next: "attackBlocked" },
    { text: "Dijital direncimizi artırdık", next: "cyberResilience" }
  ],
  "Büyük çaplı doğal afet gerçekleşti_round1": [
    { text: "Afet bölgesi ilan edildi", next: "disasterDeclare" },
    { text: "Uluslararası yardım ekipleri bekliyoruz", next: "rescueHelp" },
    { text: "Afet sonrası yeniden yapılanma planı açıkladık", next: "rebuildPlan" }
  ],
  "Büyük çaplı doğal afet gerçekleşti_round2": [
    { text: "Arama kurtarma çalışmaları sürüyor", next: "rescueOps" },
    { text: "Geçici barınma alanları oluşturuluyor", next: "shelters" },
    { text: "Gıda ve sağlık yardımı ulaştırıldı", next: "aidDelivered" }
  ],
  "Büyük çaplı doğal afet gerçekleşti_round3": [
    { text: "Afet fonları oluşturulmalı", next: "disasterFund" },
    { text: "Uluslararası gönüllüleri kabul ediyoruz", next: "volunteers" },
    { text: "Psikolojik destek sağlanıyor", next: "mentalSupport" }
  ],
  "Büyük çaplı doğal afet gerçekleşti_round4": [
    { text: "Afet sigortası sistemi öneriyoruz", next: "disasterInsurance" },
    { text: "Altyapı yeniden inşa ediliyor", next: "infraRepair" },
    { text: "Kayıplar için tazminat planlandı", next: "compensation" }
  ],
  "Büyük çaplı doğal afet gerçekleşti_round5": [
    { text: "Afet yönetim planı güncellendi", next: "disasterPlanUpdate" },
    { text: "Erken uyarı sistemi kuruldu", next: "earlyWarning" },
    { text: "Kriz başarıyla yönetildi", next: "crisisHandled" }
  ],
  "Ticaret ambargosu ile karşı karşıyasınız_round1": [
    { text: "Ambargoyu kınıyoruz", next: "sanctionCondemn" },
    { text: "Yeni ticaret ortakları arıyoruz", next: "tradeDiversify" },
    { text: "Müzakerelere hazırız", next: "negotiate" }
  ],
  "Ticaret ambargosu ile karşı karşıyasınız_round2": [
    { text: "Ambargoya karşı tedbir alıyoruz", next: "counterMeasures" },
    { text: "İç piyasayı destekliyoruz", next: "domesticSupport" },
    { text: "Ambargoyu yasal yollarla aşacağız", next: "legalFight" }
  ],
  "Ticaret ambargosu ile karşı karşıyasınız_round3": [
    { text: "İkili ticaret anlaşmaları arıyoruz", next: "bilateralDeals" },
    { text: "Takas ekonomisine geçiş yaptık", next: "barter" },
    { text: "Yeni pazarlara açılma hedefindeyiz", next: "newMarkets" }
  ],
  "Ticaret ambargosu ile karşı karşıyasınız_round4": [
    { text: "Ambargodan etkilenen sektörlere destek", next: "sectorAid" },
    { text: "Üretimi artırmak için plan yapıyoruz", next: "increaseProduction" },
    { text: "Ambargoyu kaldırmak için diplomatik baskı", next: "diplomaticPressure" }
  ],
  "Ticaret ambargosu ile karşı karşıyasınız_round5": [
    { text: "Ambargo aşıldı, ihracat yeniden başladı", next: "exportBack" },
    { text: "Ticaret anlaşmaları imzalandı", next: "tradeTreaty" },
    { text: "Ekonomimiz direnç kazandı", next: "economyResilient" }
  ],
  
  };
  
  export default chatOptions;
  