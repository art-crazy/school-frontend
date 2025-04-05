import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Alert, Box, CircularProgress } from '@mui/material';
import { resendVerificationEmail, verifyEmail } from '@/shared/api/auth';

const RESEND_COOLDOWN = 120; // 2 минуты в секундах

export default function EmailVerification() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [countdown, setCountdown] = useState<number>(0);

  useEffect(() => {
    // Проверяем время последней отправки при загрузке компонента
    const lastSentTime = localStorage.getItem(`lastEmailSent_${email}`);
    if (lastSentTime) {
      const timePassed = Math.floor((Date.now() - parseInt(lastSentTime)) / 1000);
      if (timePassed < RESEND_COOLDOWN) {
        setCountdown(RESEND_COOLDOWN - timePassed);
      }
    }

    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [countdown, email]);

  const handleResendEmail = async () => {
    if (!email || countdown > 0) return;
    
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      await resendVerificationEmail(email);
      setSuccess('Письмо успешно отправлено');
      setCountdown(RESEND_COOLDOWN);
      // Сохраняем время отправки в localStorage
      localStorage.setItem(`lastEmailSent_${email}`, Date.now().toString());
    } catch (err: any) {
      const errorMessage = err.message.split(': ')[1];
      const errorData = JSON.parse(errorMessage);
      setError(errorData.message);
    } finally {
      setLoading(false);
    }
  };

  if (!email) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Alert severity="error">
          Email не найден. Пожалуйста, зарегистрируйтесь снова.
        </Alert>
        <Button 
          variant="contained" 
          onClick={() => navigate('/')}
          sx={{ mt: 2 }}
        >
          Вернуться на главную
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Подтверждение email
      </Typography>
      
      <Typography paragraph>
        На ваш email {email} было отправлено письмо с подтверждением.
        Пожалуйста, проверьте почту и перейдите по ссылке в письме.
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

      <Box sx={{ mt: 2 }}>
        {countdown > 0 ? (
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            color: 'primary.main',
            fontWeight: 'medium'
          }}>
            <CircularProgress 
              size={16} 
              thickness={4} 
              sx={{ mr: 1 }} 
            />
            <Typography variant="body2">
              Следующая отправка будет доступна через: {countdown} сек
            </Typography>
          </Box>
        ) : (
          <Button
            variant="contained"
            onClick={handleResendEmail}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            {loading ? 'Отправка...' : 'Отправить письмо повторно'}
          </Button>
        )}
      </Box>
    </Container>
  );
}
