'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/context/ToastContext';
import styles from './business.module.css';
import Button from '@/components/ui/Button';
import { addInquiry } from '@/lib/firestore';

export default function BusinessPage() {
  const { t } = useLanguage();
  const { showToast } = useToast();
  const [form, setForm] = useState({
    company: '',
    email: '',
    region: '',
    inquiryType: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.company || !form.email || !form.region || !form.inquiryType || !form.message) {
      showToast('모든 항목을 입력해주세요.', 'error');
      return;
    }
    setSubmitting(true);
    try {
      await addInquiry(form);
      showToast('문의가 성공적으로 접수되었습니다.', 'success');
      setForm({ company: '', email: '', region: '', inquiryType: '', message: '' });
    } catch (err) {
      console.error('문의 접수 실패:', err);
      showToast('문의 접수에 실패했습니다. 다시 시도해주세요.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.headerBg}></div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <span className={`${styles.label} reveal-anim`}>BUSINESS RESOURCE CENTER</span>
          <h1 className="reveal-anim" style={{ animationDelay: '0.2s' }}>{t.business.subtitle}</h1>
        </div>
      </div>

      <div className="container">
        <div className={styles.content}>
          {/* Download Section */}
          <section className={styles.section}>
            <h2>{t.business.download.title}</h2>
            <p className={styles.desc}>{t.business.download.desc}</p>

            <div className={styles.downloadGrid}>
              <div className={styles.downloadCard}>
                <div className={styles.fileIcon}>PDF</div>
                <div className={styles.fileInfo}>
                  <h3>{t.business.download.catalog}</h3>
                  <p>2025 OceanTech Product Catalog.pdf</p>
                </div>
                <Button variant="outline" size="sm" style={{ width: '100%' }}>DOWNLOAD ASSET</Button>
              </div>
              <div className={styles.downloadCard}>
                <div className={styles.fileIcon}>ZIP</div>
                <div className={styles.fileInfo}>
                  <h3>{t.business.download.kit}</h3>
                  <p>Media_Kit_v2.0.zip</p>
                </div>
                <Button variant="outline" size="sm" style={{ width: '100%' }}>DOWNLOAD ASSET</Button>
              </div>
              <div className={styles.downloadCard}>
                <div className={styles.fileIcon}>AI</div>
                <div className={styles.fileInfo}>
                  <h3>{t.business.download.bi}</h3>
                  <p>Brand_Logo_Assets.ai</p>
                </div>
                <Button variant="outline" size="sm" style={{ width: '100%' }}>DOWNLOAD ASSET</Button>
              </div>
            </div>
          </section>

          {/* Inquiry Form → Firestore */}
          <section className={styles.section}>
            <div className={styles.inquiryBox}>
              <h2>{t.business.inquiry.title}</h2>
              <p>{t.business.inquiry.desc}</p>
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <input
                    type="text"
                    name="company"
                    placeholder="Company Name"
                    className={styles.input}
                    value={form.company}
                    onChange={handleChange}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    className={styles.input}
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.formGroup}>
                  <select name="region" className={styles.select} value={form.region} onChange={handleChange}>
                    <option value="">Select Region</option>
                    <option value="North America">North America</option>
                    <option value="Europe">Europe</option>
                    <option value="Southeast Asia">Southeast Asia</option>
                    <option value="Japan">Japan</option>
                    <option value="Other">Other</option>
                  </select>
                  <select name="inquiryType" className={styles.select} value={form.inquiryType} onChange={handleChange}>
                    <option value="">Inquiry Type</option>
                    <option value="Wholesale">Wholesale</option>
                    <option value="Export / Distribution">Export / Distribution</option>
                    <option value="OEM / ODM">OEM / ODM</option>
                  </select>
                </div>
                <textarea
                  name="message"
                  placeholder="Message"
                  className={styles.textarea}
                  value={form.message}
                  onChange={handleChange}
                />
                <button
                  className={styles.submitBtn}
                  type="submit"
                  disabled={submitting}
                >
                  {submitting ? '접수 중...' : t.business.inquiry.btn}
                </button>
              </form>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
