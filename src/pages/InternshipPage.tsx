import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import logoImg from '../logo/logo for website.png';

export default function InternshipPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [confirmError, setConfirmError] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const params = useMemo(() => new URLSearchParams(window.location.search), []);
  const [dr, setDr] = useState('');
  const [roll, setRoll] = useState('');
  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxXSqV_oxAYdx-BoiXej3VTP89iIE8nW_WA76Nm-kLdPMKDZ0Cg6ckZK9DUHoDh4xO1/exec';
  const navigate = useNavigate();

  useEffect(() => {
    setDr(params.get('dr') || '');
    setRoll(params.get('roll') || '');
  }, [params]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    const email = (form.elements.namedItem('email') as HTMLInputElement)?.value || '';
    const confirmEmail = (form.elements.namedItem('confirmEmail') as HTMLInputElement)?.value || '';
    if (email.trim() !== confirmEmail.trim()) {
      e.preventDefault();
      setConfirmError('Email addresses do not match');
      setStatus('error');
      setErrorMsg('Email addresses do not match');
    } else {
      e.preventDefault();
      setConfirmError('');
      setStatus('submitting');
      setErrorMsg('');
      const fd = new FormData(form);
      fd.set('dr', dr);
      fd.set('roll', roll);
      const body = new URLSearchParams();
      for (const [key, value] of fd as any) {
        body.append(key, value as string);
      }
      try {
        const res = await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: body.toString(),
          mode: 'cors',
        });
        if (res.ok) {
          setStatus('success');
          setTimeout(() => navigate('/'), 3000);
        } else {
          setStatus('error');
          setErrorMsg('Submission failed. Please try again.');
        }
      } catch {
        setStatus('error');
        setErrorMsg('Network error. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen" style={{ fontFamily: 'system-ui, Arial, sans-serif' }}>
      <div className="min-h-screen bg-gradient-to-b from-[#0B1220] via-[#11192c] to-[#121a2e] text-[#D9E8FF]">
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

        <div className="pt-28 pb-20">
          <div className="container mx-auto px-6 flex justify-center">
            <div className="w-full max-w-[700px] rounded-2xl bg-[#0e1628] border border-[#223055] shadow-soft p-6 md:p-8">
              <div className="flex justify-center mb-4">
                <img src={logoImg} alt="Bit4Git" className="h-14 w-auto" />
              </div>
              <h1 className="text-center text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#3BAFDA] to-[#8C75FF] bg-clip-text text-transparent">Internship Registration Form</h1>

              <div className="mt-6">
                <h2 className="text-center text-xl font-bold text-[#D9E8FF]">Internship Registration Form</h2>
                <div className="mt-3 text-sm text-[#BFC8D9]">
                  <div>Experience: Freshers / Experienced</div>
                  <div>Location: Remote</div>
                  <div>Duration: 1 Month</div>
                  <div>Stipend: Unpaid</div>
                </div>
                <p className="mt-3 text-sm text-[#BFC8D9]">Welcome to the Bit4Git internship program! Please read the instructions carefully before filling out the form.</p>
              </div>

              <div className="mt-6 rounded-md bg-[#11192c] border-l-4 border-[#3BAFDA] p-4 text-[#BFC8D9]">
                <div className="font-semibold text-[#D9E8FF]">Please follow these steps:</div>
                <ol className="list-decimal ml-5 mt-2 space-y-1">
                  <li>Read our Terms and Conditions carefully.</li>
                  <li>Fill out the internship application form with accurate details.</li>
                  <li>Submit the form.</li>
                </ol>
                <div className="mt-2 text-sm">By submitting the form, you confirm that you have read and accepted the Terms and Conditions of the Bit4Git internship program.</div>
              </div>

              <form
                className="mt-6 space-y-5"
                method="POST"
                action={GOOGLE_SCRIPT_URL}
                onSubmit={onSubmit}
              >
                <div>
                  <label className="block text-sm font-semibold">Name *</label>
                  <div className="text-xs text-[#8892A6]">First and last name</div>
                  <input type="text" name="fullName" required className="mt-1 w-full rounded-md bg-[#121a2e] border border-[#2B3561] p-2 text-[#D9E8FF] placeholder-[#8892A6] focus:outline-none focus:ring-2 focus:ring-[#3BAFDA] focus:border-transparent" />
                </div>

                <div>
                  <label className="block text-sm font-semibold">Email ID *</label>
                  <input type="email" name="email" required placeholder="you@example.com" className="mt-1 w-full rounded-md bg-[#121a2e] border border-[#2B3561] p-2 text-[#D9E8FF] placeholder-[#8892A6] focus:outline-none focus:ring-2 focus:ring-[#3BAFDA] focus:border-transparent" />
                </div>

                <div>
                  <label className="block text-sm font-semibold">Confirm Email ID *</label>
                  <input type="email" name="confirmEmail" required placeholder="Confirm your email" className="mt-1 w-full rounded-md bg-[#121a2e] border border-[#2B3561] p-2 text-[#D9E8FF] placeholder-[#8892A6] focus:outline-none focus:ring-2 focus:ring-[#3BAFDA] focus:border-transparent" />
                  {confirmError && <div className="mt-1 text-xs text-red-500">{confirmError}</div>}
                </div>

                <div>
                  <label className="block text-sm font-semibold">College Name</label>
                  <input type="text" name="college" placeholder="e.g., Delhi University" className="mt-1 w-full rounded-md bg-[#121a2e] border border-[#2B3561] p-2 text-[#D9E8FF] placeholder-[#8892A6] focus:outline-none focus:ring-2 focus:ring-[#3BAFDA] focus:border-transparent" />
                </div>

                <div>
                  <label className="block text-sm font-semibold">Course *</label>
                  <select name="course" required className="mt-1 w-full rounded-md bg-[#121a2e] border border-[#2B3561] p-2 text-[#D9E8FF] focus:outline-none focus:ring-2 focus:ring-[#3BAFDA] focus:border-transparent">
                    <option disabled value="">Select</option>
                    <option>B.Tech</option>
                    <option>BCA</option>
                    <option>BSc</option>
                    <option>BBA</option>
                    <option>MBA</option>
                    <option>Diploma</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold">LinkedIn Profile Link *</label>
                  <input type="url" name="linkedin" required placeholder="https://linkedin.com/in/yourname" className="mt-1 w-full rounded-md bg-[#121a2e] border border-[#2B3561] p-2 text-[#D9E8FF] placeholder-[#8892A6] focus:outline-none focus:ring-2 focus:ring-[#3BAFDA] focus:border-transparent" />
                </div>

                <div>
                  <label className="block text-sm font-semibold">Country *</label>
                  <select name="country" required className="mt-1 w-full rounded-md bg-[#121a2e] border border-[#2B3561] p-2 text-[#D9E8FF] focus:outline-none focus:ring-2 focus:ring-[#3BAFDA] focus:border-transparent">
                    <option disabled value="">Select</option>
                    <option>India</option>
                    <option>Sri Lanka</option>
                    <option>USA</option>
                    <option>UK</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold">Duration</label>
                  <select name="duration" className="mt-1 w-full rounded-md bg-[#121a2e] border border-[#2B3561] p-2 text-[#D9E8FF] focus:outline-none focus:ring-2 focus:ring-[#3BAFDA] focus:border-transparent" defaultValue="1 Month">
                    <option>1 Month</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold">Internship Start On *</label>
                  <input type="date" name="startDate" required defaultValue="2025-12-11" className="mt-1 w-full rounded-md bg-[#121a2e] border border-[#2B3561] p-2 text-[#D9E8FF] focus:outline-none focus:ring-2 focus:ring-[#3BAFDA] focus:border-transparent" />
                </div>

                <div>
                  <label className="block text-sm font-semibold">Internship At *</label>
                  <select name="internshipAt" required className="mt-1 w-full rounded-md bg-[#121a2e] border border-[#2B3561] p-2 text-[#D9E8FF] focus:outline-none focus:ring-2 focus:ring-[#3BAFDA] focus:border-transparent">
                    <option>Web Development</option>
                    <option>Cybersecurity</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold">Experience *</label>
                  <select name="experience" required className="mt-1 w-full rounded-md bg-[#121a2e] border border-[#2B3561] p-2 text-[#D9E8FF] focus:outline-none focus:ring-2 focus:ring-[#3BAFDA] focus:border-transparent">
                    <option>Select</option>
                    <option>Fresher</option>
                    <option>0–1 Year</option>
                    <option>2–3 Years</option>
                    <option>3+ Years</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold">Location *</label>
                  <select name="location" required className="mt-1 w-full rounded-md bg-[#121a2e] border border-[#2B3561] p-2 text-[#D9E8FF] focus:outline-none focus:ring-2 focus:ring-[#3BAFDA] focus:border-transparent" defaultValue="Remote">
                    <option>Remote</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold">How do you know about us? *</label>
                  <select name="source" required className="mt-1 w-full rounded-md bg-[#121a2e] border border-[#2B3561] p-2 text-[#D9E8FF] focus:outline-none focus:ring-2 focus:ring-[#3BAFDA] focus:border-transparent">
                    <option>Select</option>
                    <option>LinkedIn</option>
                    <option>Instagram</option>
                    <option>Friends</option>
                    <option>College Training</option>
                    <option>Bit4Git Website</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="flex items-start gap-2">
                  <input type="checkbox" name="terms" required className="mt-1" />
                  <label className="text-sm">I have read & accepted the terms and conditions. *</label>
                </div>

                <input type="hidden" name="dr" id="dr" value={dr} />
                <input type="hidden" name="roll" id="roll" value={roll} />

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
                  <button type="submit" className="w-full md:w-auto rounded-md bg-gradient-to-r from-[#3BAFDA] to-[#8C75FF] text-white px-4 py-2 shadow-softGlow hover:scale-105 transition-transform disabled:opacity-60" disabled={status==='submitting'}>{status==='submitting' ? 'Submitting...' : 'Submit'}</button>
                  <a href="/careers" className="w-full md:w-auto rounded-md bg-[#131A2C] text-[#BFC8D9] px-4 py-2 text-center border border-[#2B3561]">Back</a>
                </div>
              </form>
              {status==='error' && (
                <div className="mt-4 text-sm text-red-500">{errorMsg}</div>
              )}
              {status==='success' && (
                <div className="mt-6 rounded-2xl bg-[#0e1628] border border-[#223055] p-6 text-center">
                  <div className="text-2xl font-bold bg-gradient-to-r from-[#3BAFDA] to-[#8C75FF] bg-clip-text text-transparent">Submission Successful</div>
                  <div className="mt-2 text-[#BFC8D9]">Thank you for applying! Redirecting to home…</div>
                  <a href="/" className="inline-block mt-4 rounded-md bg-gradient-to-r from-[#3BAFDA] to-[#8C75FF] text-white px-4 py-2 shadow-softGlow">Go to Home</a>
                </div>
              )}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
