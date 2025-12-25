"use client";

import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewsForm() {

  const [loading, setLoading] = useState(false);
  const router=useRouter(); 
  
  async function handleSubmit(e) {
    e.preventDefault();
    console.log(e.target,e.currentTarget);
    
    setLoading(true);

    const formData = new FormData(e.target);

    await fetch("/api/news", {
      method: "POST",
      body: formData,
    });
    setLoading(false);

    router.push("/news");
    router.refresh();
    
  }

  return (
    <form onSubmit={handleSubmit} className={styles.wrapper}>
      <h2 className={styles.heading}>Create News</h2>

      <div className={styles.control}>
        <label className={styles.label}>Title</label>
        <input name="title" className={styles.input} required />
      </div>

      <div className={styles.control}>
        <label className={styles.label}>Slug</label>
        <input name="slug" className={styles.input} required />
      </div>

      <div className={styles.control}>
        <label className={styles.label}>Content</label>
        <textarea name="content" className={styles.textarea} required />
      </div>

      <div className={styles.control}>
        <label className={styles.label}>Date</label>
        <input type="date" name="date" className={styles.input} required />
      </div>

      <div className={styles.control}>
        <label className={styles.label}>Image</label>
        <input type="file" name="image" className={styles.fileInput} required />
      </div>

      <div className={styles.actions}>
        <button type="reset" className={styles.secondaryBtn}>
          Reset
        </button>
        <button
          className={styles.primaryBtn}
          disabled={loading}
        >
          {loading ? "Publishing..." : "Publish"}
        </button>
      </div>
    </form>
  );
}