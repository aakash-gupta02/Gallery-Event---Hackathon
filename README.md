# **Event Gallery Platform**  
### **Hackathon Submission Guide** 🚀  

---

## **📌 Table of Contents**  
1. [Project Overview](#-project-overview)  
2. [Tech Stack](#-tech-stack)  
3. [Key Features](#-key-features)  
4. [Setup Guide](#-setup-guide)  
5. [Screenshots & Walkthrough](#-screenshots--walkthrough)  
6. [Challenges & Solutions](#-challenges--solutions)  
7. [Future Scope](#-future-scope)  
8. [Team](#-team)  

---

## **🌐 Project Overview**  
**Problem Statement:**  
Corporate events generate tons of media, but it’s scattered across emails, phones, and cloud storage.  

**Our Solution:**  
A **centralized, AI-powered event gallery** where teams can:  
✅ Upload & organize event media  
✅ Automatically tag/categorize content  
✅ Relive memories with smart search  

Built in **10 days** for the *Digital Innovation Hackathon*.  

---

## **💻 Tech Stack**  
| Category       | Technologies Used |  
|---------------|------------------|  
| **Frontend**  | React, TailwindCSS, Framer Motion |  
| **Backend**   | Node.js, Express, Typescript |  
| **Cloud**     | Cloudinary (Media Storage) |  
| **Auth**      | JWT, Bcrypt |  
| **Database**    | MySQL |  
| **Deploy & Devops**    | Render, Railway |  


---

## **✨ Key Features**  

### **1. Smart Media Upload**  
- Drag-and-drop for bulk uploads  
- AI auto-tagging (e.g., "Team Outing 2023")  
```javascript
// Example: Cloudinary upload snippet
cloudinary.uploader.upload(file, { folder: "events" });
```

### **2. Event Timeline**  
- Chronological view with interactive filters  
[![Screenshot-2025-07-12-214958.png](https://i.postimg.cc/k4SvLkKq/Screenshot-2025-07-12-214958.png)](https://postimg.cc/LYHP1Qxb) 

### **3. Admin Moderation**  
- Approve/reject media with audit logs  
```sql
-- Sample query for pending media
SELECT * FROM media WHERE approved = false;
```

### **4. Engagement Analytics**  
- Real-time stats on likes/comments  
[![image.png](https://i.postimg.cc/zvxmRbBd/image.png)](https://postimg.cc/sGGHk25S)  

---

## **⚙️ Setup Guide**  

### **Backend Setup**  
1. Clone repo:  
   ```bash
   git clone https://github.com/your-repo/event-gallery.git
   cd backend
   ```
2. Configure `.env`:  
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASS=yourpassword
   CLOUDINARY_URL=your_cloudinary_key
   ```
3. Start server:  
   ```bash
   npm install
   npm start
   ```

### **Frontend Setup**  
```bash
cd frontend
npm install
npm run dev
```
**Access:** `http://localhost:3000`  

---

## **📸 Screenshots & Walkthrough**  

### **1. Landing Page**  
[![Screenshot-2025-07-12-214852.png](https://i.postimg.cc/8khb4gTb/Screenshot-2025-07-12-214852.png)](https://postimg.cc/w3jJxPyt) 

### **2. Admin Dashboard**  
- Visual stats + quick actions  
[![Screenshot-2025-07-12-215033.png](https://i.postimg.cc/Gt1xRqxY/Screenshot-2025-07-12-215033.png)](https://postimg.cc/vg3VL7jH)

### **3. Media Upload Flow**  
[![Screenshot-2025-07-12-215940.png](https://i.postimg.cc/D0J0CTXP/Screenshot-2025-07-12-215940.png)](https://postimg.cc/QKDjtvSF)
---

## **🔥 Challenges & Solutions**  

| Challenge | Solution |  
|-----------|----------|  
| **Large file uploads** | Used Cloudinary + chunked uploads |  
| **Mobile responsiveness** | Tailwind’s flex/grid system |  

---

## **🚀 Future Scope**  
- **AI Face Recognition** – Auto-tag team members  
- **Slack Integration** – Share galleries instantly  
- **AR View** – 3D event memory wall  

---

## **👥 Team**  
| Name | Role | Contribution |  
|------|------|-------------|  
| Aakash | Full-Stack | Frontend & Authentication |  
| Roshan | Backend | Backend API |  
| Ajay | Moderator | Team Moderation |  

---

# **💡 Why We’re Proud**  
This project solves **real corporate pain points** with:  
- **10x faster** media retrieval  
- **Zero manual organization**  
- **Enterprise-grade security**  

**Built with ❤️ in 240 hours!**  

--- 

**Repo Link:** [github.com/Gallery-Event](https://github.com/aakash-gupta02/Gallery-Event---Hackathon)  
**Live Link:** [Event Gallery](https://gallery-event-hackathon.vercel.app/)  


--- 

**🎉 Happy Judging!** Let’s connect if you want a live walkthrough!  

--- 

### **Screenshots Appendix**  
| Feature | Screenshot |  
|---------|-----------|  
| **Mobile View** | [![Screenshot-2025-07-12-215207.png](https://i.postimg.cc/W4hnwD4D/Screenshot-2025-07-12-215207.png)](https://postimg.cc/KKhBZ8BF) |  
| **Moderation Queue** | [![Screenshot-2025-07-12-215243.png](https://i.postimg.cc/bw6gn0qc/Screenshot-2025-07-12-215243.png)](https://postimg.cc/v4V5FV13) |  

--- 
