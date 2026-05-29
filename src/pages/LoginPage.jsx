import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, UserPlus } from 'lucide-react';
import useStore from '../store/useStore';
import { useToast } from '../components/common/Toast';

export default function LoginPage() {
  const { login, register } = useStore();
  const navigate = useNavigate();
  const toast = useToast();
  const [tab, setTab] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const set = (f, v) => setForm(p => ({ ...p, [f]: v }));

  const handleLogin = () => {
    setError('');
    const result = login(form.email, form.password);
    if (result.success) {
      toast('登入成功！歡迎回來 ' + result.user.name, 'success');
      navigate('/');
    } else {
      setError(result.error);
    }
  };

  const handleRegister = () => {
    setError('');
    if (!form.name.trim()) return setError('請輸入姓名');
    if (!form.email.trim()) return setError('請輸入 Email');
    if (form.password.length < 6) return setError('密碼至少 6 碼');
    const result = register(form.name.trim(), form.email.trim(), form.password);
    if (result.success) {
      toast('註冊成功！', 'success');
      navigate('/');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <div style={{ fontSize: '3rem' }}>🗺️</div>
          <h1>TripPlan</h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: 4 }}>行程規劃，旅伴協作</p>
        </div>

        <div className="login-tabs">
          <button className={`login-tab ${tab === 'login' ? 'active' : ''}`} onClick={() => { setTab('login'); setError(''); }}>
            <LogIn size={15} /> 登入
          </button>
          <button className={`login-tab ${tab === 'register' ? 'active' : ''}`} onClick={() => { setTab('register'); setError(''); }}>
            <UserPlus size={15} /> 註冊
          </button>
        </div>

        <div className="login-form">
          {tab === 'register' && (
            <div className="form-group">
              <label>姓名</label>
              <input className="form-input" value={form.name} onChange={e => set('name', e.target.value)} placeholder="您的名字" />
            </div>
          )}
          <div className="form-group">
            <label>Email</label>
            <input className="form-input" type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="your@email.com" />
          </div>
          <div className="form-group">
            <label>密碼</label>
            <input
              className="form-input" type="password" value={form.password}
              onChange={e => set('password', e.target.value)}
              placeholder={tab === 'register' ? '至少 6 個字元' : ''}
              onKeyDown={e => e.key === 'Enter' && (tab === 'login' ? handleLogin() : handleRegister())}
            />
          </div>
          {error && <p className="text-danger" style={{ fontSize: '0.85rem' }}>{error}</p>}
          <button
            className="btn-primary full-width btn-large"
            onClick={tab === 'login' ? handleLogin : handleRegister}
          >
            {tab === 'login' ? <><LogIn size={16} /> 登入</> : <><UserPlus size={16} /> 建立帳號</>}
          </button>
        </div>

        <div className="login-demo">
          <p>測試帳號（點擊快速登入）：</p>
          <button className="demo-btn" onClick={() => { set('email', 'demo@example.com'); set('password', 'demo123'); }}>
            👤 旅遊達人小明 — demo@example.com / demo123
          </button>
          <button className="demo-btn" onClick={() => { set('email', 'user2@example.com'); set('password', 'demo123'); }}>
            👤 小花 — user2@example.com / demo123
          </button>
        </div>
      </div>
    </div>
  );
}
