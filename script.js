// JavaScript for Kingston Blessed's Portfolio Website

// Detailed content for projects and blog posts to populate modals dynamically
const modalData = {
  project1: {
    title: "AI-Powered Admin System",
    subtitle: "n8n + Airtable + Gemini API + Gmail + Custom Dashboard",
    category: "Workflow Automation",
    content: `
      <h2>1. Project Overview</h2>
      <p>This system automates three core admin workflows—email processing, client/project management, and overdue task monitoring—for a small consulting business. It uses n8n Cloud as the orchestration engine, Airtable as the database layer, and Gemini 1.5 Flash for classification and text generation.</p>
      
      <div class="callout">
        <p><strong>Portfolio Note:</strong> Gmail is used in place of Microsoft Outlook due to Azure directory access limitations on personal accounts. The Microsoft Graph API integration path is fully documented and identical in workflow logic.</p>
      </div>

      <h2>2. What the System Does</h2>
      <ul>
        <li><strong>Email Pipeline:</strong> Monitors Gmail inbox every 5 minutes and classifies incoming emails as CLIENT, ADMIN, or JUNK.</li>
        <li><strong>Data Extraction:</strong> Extracts structured data from client emails, including sender details, project context, action items, and key dates.</li>
        <li><strong>CRM Auto-Sync:</strong> Automatically creates or updates Airtable client and project records using the extracted email data.</li>
        <li><strong>Task Generator:</strong> Creates and assigns follow-up tasks from email action items.</li>
        <li><strong>Draft Replies:</strong> Generates AI draft replies queued in Airtable for human approval before sending.</li>
        <li><strong>Daily Task Monitor:</strong> Runs a daily scan for overdue tasks and emails a formatted reminder digest to the team.</li>
        <li><strong>Real-time Dashboard:</strong> Surfaces live project metrics in a custom dashboard deployed on Vercel.</li>
      </ul>

      <h2>3. Technology Stack</h2>
      <table>
        <thead>
          <tr>
            <th>Component</th>
            <th>Tool Used</th>
            <th>Role / Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Workflow Automation</td>
            <td>n8n Cloud</td>
            <td>Main orchestrator; handles scheduling, HTTP requests, and conditional routing.</td>
          </tr>
          <tr>
            <td>Database / CRM</td>
            <td>Airtable</td>
            <td>Relational database with Clients, Projects, Tasks, Communications, and Invoices tables.</td>
          </tr>
          <tr>
            <td>AI / LLM</td>
            <td>Gemini 1.5 Flash</td>
            <td>Performs classification, entity extraction (JSON format), and drafts responses.</td>
          </tr>
          <tr>
            <td>Deployment</td>
            <td>Vercel</td>
            <td>Hosts the React-based frontend dashboard that displays live Airtable stats.</td>
          </tr>
        </tbody>
      </table>

      <h2>4. Database Architecture</h2>
      <p>The Airtable base contains 5 linked tables:</p>
      <ol>
        <li><strong>Clients:</strong> Fields: Client Name, Email, Phone, Company, Projects (Link), Communications (Link).</li>
        <li><strong>Projects:</strong> Fields: Project Name, Client (Link), Status (Active, Proposal, Complete), Tasks (Link), Invoices (Link).</li>
        <li><strong>Tasks:</strong> Fields: Task Name, Project (Link), Due Date, Attended/Completed (Checkbox), Priority.</li>
        <li><strong>Communications:</strong> Fields: Subject, Date, Category (Client, Admin, Junk), Body, Raw Email, Draft Reply.</li>
        <li><strong>Invoices:</strong> Fields: Invoice Number, Project (Link), Amount, Status (Paid, Pending, Overdue).</li>
      </ol>
    `
  },
  project2: {
    title: "Clinic Automation System",
    subtitle: "n8n + Google Sheets + Google Calendar + Gmail",
    category: "Healthcare Automation",
    content: `
      <h2>1. Project Overview</h2>
      <p>This clinic automation system is designed to streamline front-desk operations by automating appointment confirmations, patient follow-ups, and inactive patient win-back cycles. It uses n8n to connect Google Calendar, Google Sheets, and Gmail, running 24/7 in the background with zero staff intervention needed.</p>

      <h2>2. Core Automated Workflows (Flow 1, 2 & 3)</h2>
      
      <h3>Flow 1: Appointment Reminders</h3>
      <p>Triggered whenever a calendar event is created in Google Calendar (using the format <code>PT-001 — Patient Name</code>). It retrieves patient contacts and logs reminders in Google Sheets:</p>
      <ul>
        <li><strong>-48 Hours:</strong> Sends appointment confirmation email with prep instructions.</li>
        <li><strong>-24 Hours:</strong> Sends a nudge asking to confirm or reschedule.</li>
        <li><strong>-2 Hours:</strong> Sends a final nudge letting them know their slot is coming up.</li>
        <li><strong>+1 Hour (No-Show):</strong> If the staff doesn't check "attended" within 1 hour, it sends a friendly rebooking invite.</li>
      </ul>

      <h3>Flow 2: New Patient Nurturing</h3>
      <p>Triggered when staff add an inquiry to the Google Sheets "Leads" tab. It sends a 4-step email sequence over 7 days to guide them to book. If they book, the sequence stops immediately. If they don't, they are automatically flagged for Flow 3.</p>

      <h3>Flow 3: Inactive Patient Reactivation</h3>
      <p>Runs automatically every Monday at 8:00 AM. It scans the patient list for anyone who has not visited in 6+ months, or leads who never booked. It sends a 3-step reactivation sequence (Day 1: "We miss you" check-in, Day 3: Education/health tips, Day 7: Priority slot booking link).</p>

      <h2>3. Google Sheet Database Schema</h2>
      <table>
        <thead>
          <tr>
            <th>Tab Name</th>
            <th>Primary Fields</th>
            <th>Purpose</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Patients</td>
            <td>patient_id, full_name, email, phone, last_visit_date, opted_out</td>
            <td>Master record of patients. Used to cross-reference contact details.</td>
          </tr>
          <tr>
            <td>Appointments</td>
            <td>patient_id, appt_datetime, calendar_event_id, confirmed, attended, last_updated</td>
            <td>Created automatically. Logs status of confirmations and no-shows.</td>
          </tr>
          <tr>
            <td>Leads</td>
            <td>lead_id, full_name, email, phone, booked (checkbox), opted_out</td>
            <td>New enquiries. Flow 2 checks booking status before each mail.</td>
          </tr>
          <tr>
            <td>Reactivation</td>
            <td>patient_id, source (inactive/unconverted), email_sent_1/2/3, rebooked</td>
            <td>Logs Monday reactivation lists. Auto-cancels if rebooked is checked.</td>
          </tr>
        </tbody>
      </table>
    `
  },
  project3: {
    title: "WULF NOIR Grant Proposal Automation",
    subtitle: "Make.com + Google Forms + Gemini API + Google Drive + Gmail",
    category: "AI Document Generation",
    content: `
      <h2>1. Project Overview</h2>
      <p>The WULF NOIR Grant Proposal Automation is a Make.com workflow designed to accelerate fundraising operations. When a user submits a funder name and a criteria document, the system automatically writes a tailored grant proposal draft, creates a Google Doc in a shared drive, and emails a link and summary to the team.</p>

      <div class="callout">
        <p><strong>Demo Build Disclosure:</strong> This is a portfolio build. Past proposals, funder criteria, and internal WULF NOIR DNA documents are mock data. Gemini 1.5 Flash is used in place of Claude Sonnet via standard HTTP post requests, allowing an identical structure.</p>
      </div>

      <h2>2. System Workflows</h2>
      <ol>
        <li><strong>Trigger:</strong> User fills a Google Form with the Funder Name and the Document ID of the criteria file (uploaded to Google Drive).</li>
        <li><strong>Reference Retrieval:</strong> Make.com pulls the WULF NOIR DNA document (defining company mission, target audience, and accomplishments) and a successful past proposal reference.</li>
        <li><strong>Funder Criteria Analysis (AI Call 1):</strong> Sends the funder criteria to the Gemini API via HTTP. Gemini extracts eligibility criteria, funding priorities, and key fields into structured JSON.</li>
        <li><strong>Draft Generation (AI Call 2):</strong> Calls Gemini again, passing the criteria analysis, past proposal style guide, and WULF NOIR DNA document. Gemini outputs a multi-page, tailored draft proposal.</li>
        <li><strong>Document Creation:</strong> Make.com creates a native Google Doc, writes the generated text with clean header formatting, and moves it to a "Generated Proposals" folder.</li>
        <li><strong>Team Notification:</strong> Emails the team with a link to the draft Google Doc and a bulleted analysis of the funder's criteria.</li>
        <li><strong>Error Handling:</strong> Includes error-handler pathways on all HTTP modules to email alerts with debug descriptions if APIs time out.</li>
      </ol>

      <h2>3. Folder & File Structure</h2>
      <pre>
/WULF NOIR DNA/
  └── WULF_NOIR_DNA_Document  (Google Doc containing core copy)

/Past Proposals/
  └── WULF_NOIR_Past_Proposal_Reference  (Google Doc style reference)

/Funder Criteria/
  └── [Upload funder PDF/criteria doc as Google Doc before running]

/Generated Proposals/
  └── [Make writes output Google Docs here dynamically]
      </pre>
    `
  },
  blog1: {
    title: "Building Robust Error Handling in n8n Workflows",
    subtitle: "May 12, 2026 • 5 min read",
    category: "Technical Thoughts",
    content: `
      <h2>Why Automated Workflows Fail</h2>
      <p>In automation engineering, the first rule is simple: if an API can fail, it will. Whether it's rate limits, transient network drops, or changes in payload formats, production workflows need built-in safeguards. Designing for failure is what separates amateur automations from enterprise systems.</p>

      <h2>Core Error Handling Strategies in n8n</h2>
      
      <h3>1. The Error Trigger Node</h3>
      <p>The Error Trigger node is a native n8n feature that acts as a catch-all block. When any node in a workflow throws an error, the system pauses execution and routes details to this trigger. From there, you can format a Slack alert, post to a database log, or email the admin with execution links.</p>

      <h3>2. Retry Settings (The Quick Fix)</h3>
      <p>For API rate-limits or short network hiccups, manual retries are perfect. In n8n, you can open any node's settings and toggle <strong>Retry on Fail</strong>. Setting it to retry 3 times with a 5-second interval resolves 90% of temporary network dropouts.</p>

      <h3>3. Default Value Fallbacks</h3>
      <p>Sometimes, an optional API call (like fetching a profile avatar) fails, but we don't want to stop the whole email pipeline. Using a <strong>Merge</strong> node combined with an <strong>If</strong> node allows us to supply a fallback string if the data is missing, keeping the flow alive.</p>

      <div class="callout alert">
        <p><strong>Pro-Tip:</strong> Always isolate third-party API integrations inside sub-workflows. By calling them via the <strong>Execute Workflow</strong> node, you keep main workflows clean and can handle failure at the boundary rather than in every single node.</p>
      </div>
    `
  },
  blog2: {
    title: "Human-in-the-Loop AI: The Safe Way to Automate Email Replies",
    subtitle: "June 2, 2026 • 6 min read",
    category: "AI Integration Design",
    content: `
      <h2>The Danger of Fully Autonomous Support</h2>
      <p>We've all seen the headlines—an AI customer service bot gets confused and promises a client a refund, or hallucinates pricing details. While LLMs are extremely capable of reading emails and drafting accurate responses, running them fully autonomously is a major business risk.</p>

      <h2>What is Human-in-the-Loop (HITL)?</h2>
      <p>Human-in-the-Loop means placing a manual approval gate between the AI's output and the final action. The AI does 95% of the work (reading the email, searching the database, drafting the reply), but a human review button must be pressed before the email is sent.</p>

      <h2>Building a HITL Email System with n8n and Airtable</h2>
      
      <h3>Step 1: The Ingestion and Draft Phase</h3>
      <p>When an email arrives, n8n grabs it, calls the Gemini API to analyze context, and drafts a reply. Instead of replying to the email immediately, n8n writes a row to Airtable's <code>Communications</code> table. It populates fields for: <code>Received Email</code>, <code>AI Draft Reply</code>, and <code>Status</code> (set to "Needs Review").</p>

      <h3>Step 2: The Airtable Control Center</h3>
      <p>The team works out of Airtable. They review the AI Draft. If it looks good, they click a checkbox called <code>Approve Email</code>. If it needs tweaks, they edit the text inside the <code>AI Draft Reply</code> box first, then click approve.</p>

      <h3>Step 3: The Outbox Trigger</h3>
      <p>A second n8n workflow triggers when a row in Airtable is updated and <code>Approve Email</code> is checked. It reads the updated draft content, sends it to the client via Gmail, logs the sent timestamp, and changes the status to "Sent". This keeps responses completely accurate and controlled.</p>
    `
  },
  blog3: {
    title: "Saving 15+ Hours/Week with Clinic Automation",
    subtitle: "June 25, 2026 • 4 min read",
    category: "Case Study & ROI",
    content: `
      <h2>The Administrative Bottleneck in Local Clinics</h2>
      <p>Front-desk clinic staff spend hours on repetitive tasks: sending reminders, confirming times, following up on cancellations, and reaching out to patients who haven't visited in a while. In a busy clinic, these tasks get forgotten, leading to high no-show rates and missed revenue.</p>

      <h2>How We Solved It</h2>
      <p>We designed an automation suite in n8n. By linking the doctor's Google Calendar directly to a Google Sheets patient CRM and automated Gmail flows, we eliminated manual confirmation tasks entirely.</p>

      <h2>The Real-World Results</h2>
      <ul>
        <li><strong>No-Shows Reduced by 60%:</strong> Patients receive confirmation texts and emails at -48h, -24h, and a final nudge at -2h, giving them ample time to cancel or confirm.</li>
        <li><strong>Automatic Waitlist Rebooking:</strong> No-shows are detected within 1 hour, triggering an automatic invite link to rebook, rescuing potential lost revenue.</li>
        <li><strong>15+ Hours Saved Weekly:</strong> The administrative staff no longer call clients to confirm appointments. They focus entirely on in-person guest care.</li>
        <li><strong>Reactivation Influx:</strong> The weekly Monday scan auto-contacts patients inactive for 6 months, generating 10-15 reactivated bookings every single week.</li>
      </ul>

      <div class="callout">
        <p><strong>System Takeaway:</strong> Clinic automation isn't about replacing front-desk staff. It's about taking away the digital grunt work so they can offer better face-to-face service in the office.</p>
      </div>
    `
  }
};

// Main DOM Content Loaded Handler
document.addEventListener("DOMContentLoaded", () => {
  setupNavigation();
  setupScrollReveal();
  setupModals();
  setupContactForm();
});

// 1. Navigation capsule logic
function setupNavigation() {
  const headerLinks = document.querySelectorAll("nav ul li a, .logo");
  const sections = document.querySelectorAll("section");

  // Highlight navigation item on scroll
  window.addEventListener("scroll", () => {
    let current = "";
    const scrollPos = window.scrollY + 120; // offset for nav height

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    });

    headerLinks.forEach((link) => {
      link.classList.remove("active");
      const href = link.getAttribute("href");
      if (href && href.substring(2) === current) {
        link.classList.add("active");
      }
    });
  });
}

// 2. Scroll Reveal Animations using Intersection Observer
function setupScrollReveal() {
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-active");
          // Optionally stop observing once revealed
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach((el) => {
      observer.observe(el);
    });
  } else {
    // Fallback for older browsers
    revealElements.forEach((el) => {
      el.classList.add("reveal-active");
    });
  }
}

// 3. Slide-over Modal Control and Data Ingestion
function setupModals() {
  const overlay = document.querySelector(".modal-overlay");
  const wrapper = document.querySelector(".modal-wrapper");
  const closeBtn = document.querySelector(".modal-close-btn");
  const modalBody = document.querySelector(".modal-body");

  // Select all trigger cards
  const projectCards = document.querySelectorAll(".project-card");
  const thoughtCards = document.querySelectorAll(".thought-card");

  // Open modal with specific data ID
  const openModal = (id) => {
    const data = modalData[id];
    if (!data) return;

    // Populate modal contents
    modalBody.innerHTML = `
      <span class="tag" style="background: rgba(37, 99, 235, 0.05); color: var(--accent-primary); border-color: rgba(37, 99, 235, 0.15); margin-bottom: 12px; display: inline-block;">${data.category}</span>
      <h1 style="font-family: var(--font-title); font-weight: 800; font-size: clamp(1.8rem, 4vw, 2.5rem); margin-bottom: 8px;">${data.title}</h1>
      <p style="font-family: var(--font-heading); font-weight: 500; font-size: 0.95rem; color: var(--accent-secondary); margin-bottom: 40px; text-transform: uppercase; letter-spacing: 0.5px;">${data.subtitle}</p>
      <div class="modal-body-content">${data.content}</div>
    `;

    // Show modal & overlay with anims
    overlay.classList.add("active");
    wrapper.classList.add("active");
    document.body.style.overflow = "hidden"; // disable scroll behind modal
  };

  // Close modal logic
  const closeModal = () => {
    overlay.classList.remove("active");
    wrapper.classList.remove("active");
    document.body.style.overflow = ""; // restore scroll
  };

  // Attach event listeners to project cards
  projectCards.forEach((card) => {
    card.addEventListener("click", () => {
      const dataId = card.getAttribute("data-id");
      openModal(dataId);
    });
  });

  // Attach event listeners to blog cards
  thoughtCards.forEach((card) => {
    card.addEventListener("click", () => {
      const dataId = card.getAttribute("data-id");
      openModal(dataId);
    });
  });

  // Close triggers
  closeBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", closeModal);

  // Esc key close
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && wrapper.classList.contains("active")) {
      closeModal();
    }
  });
}

// 4. Contact Form validation and submit logic
function setupContactForm() {
  const form = document.getElementById("portfolio-contact-form");
  const successMsg = document.getElementById("contact-success-msg");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // prevent actual submit

    // Collect inputs
    const name = document.getElementById("form-name").value.trim();
    const email = document.getElementById("form-email").value.trim();
    const project = document.getElementById("form-project").value.trim();

    if (!name || !email || !project) {
      alert("Please fill in all the required fields.");
      return;
    }

    const submitBtn = form.querySelector(".submit-btn");
    submitBtn.textContent = "Sending System Query...";
    submitBtn.disabled = true;

    // TODO: Replace this URL with your actual production n8n webhook URL
    const N8N_WEBHOOK_URL = "https://ai007.app.n8n.cloud/webhook/portfolio-contact";

    // Send the contact form data to n8n webhook
    fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        email: email,
        project: project
      })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Automation server error");
        }
        return response.json();
      })
      .then(data => {
        // Hide form fields smoothly
        form.style.transition = "opacity 0.4s ease";
        form.style.opacity = "0.1";

        setTimeout(() => {
          form.style.display = "none";
          successMsg.style.display = "block";

          // Populate custom success card details
          successMsg.innerHTML = `
          <div style="font-size: 3rem; margin-bottom: 16px;">🚀</div>
          <h3 style="font-family: var(--font-title); font-size: 1.5rem; text-transform: uppercase; margin-bottom: 8px;">Pipeline Triggered Successfully</h3>
          <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.5;">
            Thank you, <strong>${name}</strong>. Your project inquiry has been successfully parsed and ingested into my systems automation queue.<br>
            A confirmation notification has been dispatched to <strong>${email}</strong>. I will get back to you shortly.
          </p>
        `;
        }, 400);
      })
      .catch(error => {
        console.error("Submission failed:", error);
        submitBtn.textContent = "Submit Request";
        submitBtn.disabled = false;
        alert("There was an issue sending your request to the automation server. Please verify your n8n webhook URL configuration or email me directly at kingstonblessed10@gmail.com.");
      });
  });
}
