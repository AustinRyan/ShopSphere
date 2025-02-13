import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, MapPin, Camera } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { supabase } from '../lib/supabase';
import styles from '../styles/Account.module.css';

interface Profile {
  id: string;
  name: string;
  phone?: string;
  address?: string;
  avatar_url?: string;
}

const Account = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [profile, setProfile] = useState<Profile>({
    id: user?.id || '',
    name: user?.user_metadata?.name || '',
    phone: '',
    address: '',
    avatar_url: '',
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const getProfile = async () => {
      try {
        // First, try to get the existing profile
        const { data: existingProfile, error: fetchError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (fetchError && fetchError.code === 'PGRST116') {
          // Profile doesn't exist, create it
          const { data: newProfile, error: insertError } = await supabase
            .from('profiles')
            .insert([{
              id: user.id,
              name: user.user_metadata?.name || '',
              updated_at: new Date(),
            }])
            .select()
            .single();

          if (insertError) throw insertError;
          
          if (newProfile) {
            setProfile({
              id: newProfile.id,
              name: newProfile.name || user.user_metadata?.name || '',
              phone: newProfile.phone || '',
              address: newProfile.address || '',
              avatar_url: newProfile.avatar_url || '',
            });
          }
        } else if (fetchError) {
          throw fetchError;
        } else if (existingProfile) {
          setProfile({
            id: existingProfile.id,
            name: existingProfile.name || user.user_metadata?.name || '',
            phone: existingProfile.phone || '',
            address: existingProfile.address || '',
            avatar_url: existingProfile.avatar_url || '',
          });
        }
      } catch (error) {
        console.error('Error loading profile:', error);
        showToast('Error loading profile', 'error');
      } finally {
        setLoading(false);
      }
    };

    getProfile();
  }, [user, navigate, showToast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);

    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user?.id,
          name: profile.name,
          phone: profile.phone,
          address: profile.address,
          updated_at: new Date(),
        }, {
          onConflict: 'id'
        });

      if (error) {
        throw error;
      }

      showToast('Profile updated successfully!', 'success');
    } catch (error) {
      console.error('Error updating profile:', error);
      showToast('Error updating profile', 'error');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>My Profile</h1>
        <p>Manage your profile and preferences here</p>
      </div>

      <div className={styles.content}>
        <div className={styles.avatarSection}>
          <div className={styles.avatar}>
            {profile.avatar_url ? (
              <img src={profile.avatar_url} alt={profile.name} />
            ) : (
              <User size={40} />
            )}
            <button className={styles.uploadButton}>
              <Camera size={20} />
            </button>
          </div>
          <h2>{profile.name || 'Your Name'}</h2>
          <p>{user?.email}</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label>
              <User size={20} />
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              placeholder="Enter your full name"
            />
          </div>

          <div className={styles.formGroup}>
            <label>
              <Mail size={20} />
              Email
            </label>
            <input
              type="email"
              value={user?.email || ''}
              disabled
              className={styles.disabled}
            />
          </div>

          <div className={styles.formGroup}>
            <label>
              <Phone size={20} />
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
            />
          </div>

          <div className={styles.formGroup}>
            <label>
              <MapPin size={20} />
              Address
            </label>
            <input
              type="text"
              name="address"
              value={profile.address}
              onChange={handleChange}
              placeholder="Enter your address"
            />
          </div>

          <button 
            type="submit" 
            className={styles.saveButton}
            disabled={updating}
          >
            {updating ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Account;