import { Heart } from 'lucide-react';

const duas = [
  { 
    arabic: 'اللَّهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَعَافِهِ وَاعْفُ عَنْهُ، وَأَكْرِمْ نُزُلَهُ، وَوَسِّعْ مُدْخَلَهُ',
    reference: 'دعاء للميت'
  },
  { 
    arabic: 'اللَّهُمَّ اغْسِلْهُ بِالْمَاءِ وَالثَّلْجِ وَالْبَرَدِ، وَنَقِّهِ مِنَ الْخَطَايَا كَمَا نَقَّيْتَ الثَّوْبَ الْأَبْيَضَ مِنَ الدَّنَسِ',
    reference: 'رواه مسلم'
  },
  { 
    arabic: 'اللَّهُمَّ أَبْدِلْهُ دَارًا خَيْرًا مِنْ دَارِهِ، وَأَهْلًا خَيْرًا مِنْ أَهْلِهِ، وَأَدْخِلْهُ الْجَنَّةَ وَأَعِذْهُ مِنْ عَذَابِ الْقَبْرِ',
    reference: 'رواه مسلم'
  },
  { 
    arabic: 'اللَّهُمَّ اجْعَلْ قَبْرَهُ رَوْضَةً مِنْ رِيَاضِ الْجَنَّةِ وَلَا تَجْعَلْهُ حُفْرَةً مِنْ حُفَرِ النَّارِ',
    reference: 'دعاء للميت'
  },
  { 
    arabic: 'اللَّهُمَّ ثَبِّتْهُ عِنْدَ السُّؤَالِ وَنَوِّرْ لَهُ قَبْرَهُ وَافْسَحْ لَهُ فِيهِ',
    reference: 'دعاء للميت'
  },
  { 
    arabic: 'اللَّهُمَّ اجْعَلْ مَا أَصَابَهُ كَفَّارَةً وَرَفْعًا لِدَرَجَاتِهِ فِي الْجَنَّةِ',
    reference: 'دعاء للميت'
  },
  { 
    arabic: 'اللَّهُمَّ أَنِرْ لَهُ قَبْرَهُ وَاجْعَلْهُ فِي نُورٍ وَسُرُورٍ وَرَحْمَةٍ',
    reference: 'دعاء للميت'
  },
  { 
    arabic: 'اللَّهُمَّ اجْمَعْنَا بِهِ فِي جَنَّاتِكَ جَنَّاتِ النَّعِيمِ',
    reference: 'دعاء للميت'
  },
];

const DuaList = () => {
  return (
    <div className="space-y-4 max-w-2xl mx-auto" dir="rtl">
      {duas.map((dua, i) => (
        <div
          key={i}
          className="p-6 rounded-2xl bg-card border border-border hover:border-accent/40 transition-all duration-300 hover:shadow-md space-y-3 geometric-pattern"
        >
          <p className="text-2xl font-arabic text-right leading-loose text-foreground">
            {dua.arabic}
          </p>

          <div className="border-t border-border pt-3 flex items-start gap-3">
            <Heart className="w-4 h-4 mt-1 text-accent shrink-0" />

            <p className="text-sm text-accent font-medium">
              {dua.reference}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DuaList;