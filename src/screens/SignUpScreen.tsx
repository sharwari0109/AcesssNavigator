import { useState } from 'react';
import { User, Mail, Lock, Navigation2, ArrowLeft } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export function SignUpScreen() {
  const { navigate, setUser, showToast, goBack } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!name) newErrors.name = 'Full name is required';
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Enter a valid email';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (confirm !== password) newErrors.confirm = 'Passwords do not match';
    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;

    setLoading(true);
    setTimeout(() => {
      setUser({ name, email });
      showToast('Account created successfully!', 'success');
      navigate('onboarding');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-ink-50 flex flex-col">
      <div className="bg-gradient-to-br from-primary-700 to-primary-900 px-6 pt-12 pb-10 rounded-b-[2.5rem]">
        <button
          onClick={goBack}
          aria-label="Go back"
          className="p-2 -ml-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors mb-4 touch-target"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
            <Navigation2 className="w-7 h-7 text-white" strokeWidth={2.5} />
          </div>
          <h1 className="text-xl font-extrabold text-white">AccessNav</h1>
        </div>
        <h2 className="text-3xl font-extrabold text-white mb-1">Create account</h2>
        <p className="text-primary-100">Join AccessNav for accessible navigation</p>
      </div>

      <div className="flex-1 px-6 py-8 -mt-6">
        <div className="bg-white rounded-2xl shadow-card-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              placeholder="Your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={errors.name}
              leftIcon={<User className="w-5 h-5" />}
              autoComplete="name"
            />
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              leftIcon={<Mail className="w-5 h-5" />}
              autoComplete="email"
            />
            <Input
              label="Password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              showPasswordToggle
              leftIcon={<Lock className="w-5 h-5" />}
              autoComplete="new-password"
            />
            <Input
              label="Confirm Password"
              type="password"
              placeholder="Re-enter your password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              error={errors.confirm}
              showPasswordToggle
              leftIcon={<Lock className="w-5 h-5" />}
              autoComplete="new-password"
            />

            <Button type="submit" fullWidth size="lg" loading={loading}>
              Create Account
            </Button>
          </form>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-ink-200" />
            <span className="text-xs font-semibold text-ink-400 uppercase">or</span>
            <div className="flex-1 h-px bg-ink-200" />
          </div>

          <Button
            fullWidth
            size="lg"
            variant="outline"
            onClick={() => {
              setUser({ name: 'Alex Morgan', email: 'alex@gmail.com' });
              showToast('Signed up with Google', 'success');
              navigate('onboarding');
            }}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Sign up with Google
          </Button>
        </div>

        <p className="text-center mt-6 text-sm text-ink-600">
          Already have an account?{' '}
          <button
            onClick={() => navigate('welcome')}
            className="font-bold text-primary-600 hover:text-primary-700"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
}
