// MentalHealthTreatmentPage.js
import React from 'react';
import VideoEmbed from '../components/VideoEmbed';

const MentalHealthTreatmentPage = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mt-8 mb-4">The Importance of Seeking Treatment for Mental Health Issues</h1>
      <p className="mb-4">
        Seeking treatment for mental health issues is crucial for overall well-being and quality of life. Mental health conditions, such as depression, anxiety, and bipolar disorder, can significantly impact a person's daily life, relationships, and physical health. Without proper treatment, these conditions can worsen over time, leading to more severe symptoms and complications. By seeking professional help, individuals can manage their symptoms effectively and lead healthier, more fulfilling lives.
      </p>
      <p className="mb-4">
        Treatment for mental health issues often involves a combination of therapy, medication, and lifestyle changes. Therapists and counselors provide a safe space for individuals to explore their thoughts and feelings, develop coping strategies, and work through underlying issues. Medications can help balance brain chemistry and alleviate symptoms, making it easier for individuals to engage in therapy and daily activities. Additionally, adopting healthy lifestyle habits, such as regular exercise, a balanced diet, and adequate sleep, can support mental health and enhance the effectiveness of treatment.
      </p>
      <p className="mb-4">
        It is important to address mental health issues early on to prevent them from interfering with personal and professional life. Early intervention can lead to better outcomes and reduce the risk of long-term disability. Furthermore, seeking treatment helps to break the stigma associated with mental health conditions, encouraging others to seek help and fostering a more supportive and understanding community. Remember, mental health is just as important as physical health, and seeking treatment is a sign of strength, not weakness.
      </p>
      <div className="mb-4">
        <h2 className="text-2xl font-bold mt-4 mb-2">Understanding the Importance of Mental Health Treatment</h2>
        <VideoEmbed videoId="Ti5NxxAwP-Q" />
      </div>
      <div className="mb-4">
        <h2 className="text-2xl font-bold mt-4 mb-2">Resources</h2>
        <ul className="list-disc list-inside">
          <li><a href="https://www.mentalhealth.gov/get-help" className="text-blue-500 hover:underline">MentalHealth.gov - Get Help</a></li>
          <li><a href="https://www.nami.org/Support-Education" className="text-blue-500 hover:underline">NAMI - Support & Education</a></li>
          <li><a href="https://www.samhsa.gov/find-help/national-helpline" className="text-blue-500 hover:underline">SAMHSA National Helpline</a></li>
        </ul>
      </div>
    </div>
  );
};

export default MentalHealthTreatmentPage;
