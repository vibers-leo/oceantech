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
      showToast(t.business.inquiry.allRequired, 'error');
      return;
    }
    setSubmitting(true);
    try {
      await addInquiry(form);
      showToast(t.business.inquiry.success, 'success');
      setForm({ company: '', email: '', region: '', inquiryType: '', message: '' });
    } catch (err) {
      console.error('Inquiry submission failed:', err);
      showToast(t.business.inquiry.error, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className="container">
          <span className={styles.label}>BUSINESS RESOURCE CENTER</span>
          <h1>{t.business.subtitle}</h1>
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
                <Button variant="outline" size="sm">Download</Button>
              </div>
              <div className={styles.downloadCard}>
                <div className={styles.fileIcon}>ZIP</div>
                <div className={styles.fileInfo}>
                  <h3>{t.business.download.kit}</h3>
                  <p>Media_Kit_v2.0.zip</p>
                </div>
                <Button variant="outline" size="sm">Download</Button>
              </div>
              <div className={styles.downloadCard}>
                <div className={styles.fileIcon}>AI</div>
                <div className={styles.fileInfo}>
                  <h3>{t.business.download.bi}</h3>
                  <p>Brand_Logo_Assets.ai</p>
                </div>
                <Button variant="outline" size="sm">Download</Button>
              </div>
            </div>
          </section>

          {/* Inquiry Form */}
          <section className={styles.section}>
            <div className={styles.inquiryBox}>
              <h2>{t.business.inquiry.title}</h2>
              <p>{t.business.inquiry.desc}</p>
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <input
                    type="text"
                    name="company"
                    placeholder={t.business.inquiry.form.company}
                    className={styles.input}
                    value={form.company}
                    onChange={handleChange}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder={t.business.inquiry.form.email}
                    className={styles.input}
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.formGroup}>
                  <select name="region" className={styles.select} value={form.region} onChange={handleChange}>
                    <option value="">{t.business.inquiry.form.region}</option>
                    <option value="North America">{t.business.inquiry.form.regions.northAmerica}</option>
                    <option value="Europe">{t.business.inquiry.form.regions.europe}</option>
                    <option value="Southeast Asia">{t.business.inquiry.form.regions.southeastAsia}</option>
                    <option value="Japan">{t.business.inquiry.form.regions.japan}</option>
                    <option value="Other">{t.business.inquiry.form.regions.other}</option>
                  </select>
                  <select name="inquiryType" className={styles.select} value={form.inquiryType} onChange={handleChange}>
                    <option value="">{t.business.inquiry.form.inquiryType}</option>
                    <option value="Wholesale">{t.business.inquiry.form.types.wholesale}</option>
                    <option value="Export / Distribution">{t.business.inquiry.form.types.export}</option>
                    <option value="OEM / ODM">{t.business.inquiry.form.types.oem}</option>
                  </select>
                </div>
                <textarea
                  name="message"
                  placeholder={t.business.inquiry.form.message}
                  className={styles.textarea}
                  value={form.message}
                  onChange={handleChange}
                />
                <Button
                  variant="primary"
                  size="lg"
                  className={styles.submitBtn}
                  type="submit"
                  disabled={submitting}
                >
                  {submitting ? t.business.inquiry.submitting : t.business.inquiry.btn}
                </Button>
              </form>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
