import { Calendar, MapPin, Users, Clock, Award, GraduationCap } from 'lucide-react';

export const IgniteProgrammeDetails = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Summer School Details
        </h2>

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Top Row - 2 cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Dates */}
            <div className="bg-[#C5B82A] rounded-2xl p-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <Calendar className="w-6 h-6 text-black" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-black/70 uppercase tracking-wide mb-1">Dates</h3>
                <p className="text-xl font-bold text-black">18 - 24 July 2027</p>
              </div>

            </div>

            {/* Venue */}
            <div className="bg-[#C5B82A] rounded-2xl p-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6 text-black" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-black/70 uppercase tracking-wide mb-1">Venue</h3>
                <p className="text-lg font-bold text-black leading-snug">
                  Cambridge Judge Business School, University of Cambridge, Trumpington Street, UK
                </p>
              </div>
            </div>
          </div>

          {/* Second Row - 2 cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Eligibility Age */}
            <div className="bg-[#C5B82A] rounded-2xl p-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <Users className="w-6 h-6 text-black" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-black/70 uppercase tracking-wide mb-1">Eligibility Age</h3>
                <p className="text-xl font-bold text-black">15-18 Years Old</p>
              </div>
            </div>

            {/* Timing */}
            <div className="bg-[#C5B82A] rounded-2xl p-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6 text-black" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-black/70 uppercase tracking-wide mb-1">Timing</h3>
                <p className="text-xl font-bold text-black">8 AM to 8 PM</p>
              </div>
            </div>
          </div>

          {/* Certificate - Full width */}
          <div className="bg-[#C5B82A] rounded-2xl p-6 flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6 text-black" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-black/70 uppercase tracking-wide mb-1">Certificate</h3>
              <p className="text-base text-black">
                Upon completion of the programme, students will receive a{' '}
                <span className="font-bold">
                  Certificate of Attendance from the Cambridge Judge Entrepreneurship Centre, Cambridge Judge Business School.
                </span>
              </p>
            </div>
          </div>

          {/* Fees - Full width */}
          <div className="bg-[#C5B82A] rounded-2xl p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <GraduationCap className="w-6 h-6 text-black" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-black/70 uppercase tracking-wide mb-1">Fees</h3>
                <p className="text-xl font-bold text-black">Programme Fee: £4500</p>
              </div>
            </div>
            <ul className="space-y-3 text-black text-sm ml-16">
              <li className="flex items-start gap-2">
                <span className="text-black mt-1">•</span>
                <span>
                  Covers academic fee during the Summer School at Cambridge University, stay and meals for 7 days at the allotted Clare College, University of Cambridge.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-black mt-1">•</span>
                <span>
                  The fee covers airport pickup on the arrival day and airport drop off on the departure day. (The exact pick-up location and timings to be confirmed closer to the programme.)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-black mt-1">•</span>
                <span>
                  The fee does not cover travel ticket, visa costs or sightseeing/personal expenses.
                </span>
              </li>
            </ul>
            <p className="text-black font-bold mt-6 ml-16">
              Applications open for 18 - 24 July 2027
            </p>

          </div>
        </div>
      </div>
    </section>
  );
};
