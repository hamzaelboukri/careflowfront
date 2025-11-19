import { Calendar, Users, FileText, Clock, Shield, Smartphone, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Feature = ({ icon: Icon, title, description }: { icon: any; title: string; description: string }) => {
  return (
    <div className="p-8 rounded-3xl bg-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-4" style={{ background: '#238D94' }}>
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed text-lg">{description}</p>
    </div>
  );
};

const Stat = ({ value, label }: { value: string; label: string }) => (
  <div className="text-center">
    <div className="text-4xl font-bold text-white mb-2">{value}</div>
    <div className="text-teal-100 text-sm opacity-90">{label}</div>
  </div>
);

export default function Home() {
  const navigate = useNavigate();

  const features = [
    { icon: Calendar, title: "Prise de Rendez-vous en Ligne", description: "Les patients peuvent réserver leurs consultations 24/7 via une interface intuitive et recevoir des confirmations automatiques." },
    { icon: Users, title: "Gestion des Calendriers Médicaux", description: "Les médecins organisent leurs horaires, visualisent leurs rendez-vous et optimisent leur planning quotidien." },
    { icon: FileText, title: "Dossiers Médicaux Électroniques", description: "Centralisez l historique médical complet de chaque patient : consultations, prescriptions, analyses et documents." },
    { icon: Shield, title: "Sécurité & Conformité", description: "Protection optimale des données sensibles avec cryptage et respect des normes de confidentialité médicale." },
    { icon: Clock, title: "Rappels Automatiques", description: "Réduisez les absences avec des notifications et rappels automatiques par email ou SMS." },
    { icon: Smartphone, title: "Analyses en Temps Réel", description: "Tableaux de bord interactifs avec statistiques et indicateurs de performance pour votre clinique." }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative text-white py-32 overflow-hidden" style={{ background: 'linear-gradient(to bottom right, #238D94, #1a6b70)' }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] rounded-full bg-white blur-3xl"></div>
          <div className="absolute bottom-[-150px] left-[-150px] w-[600px] h-[600px] rounded-full bg-white blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-8">
            <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-lg rounded-full mb-4">
              <p className="text-sm font-semibold tracking-wider uppercase">PLATEFORME MÉDICALE MODERNE</p>
            </div>
            <div>
              <h1 className="text-6xl md:text-7xl font-black mb-4 drop-shadow-lg">CareFlow</h1>
              <h2 className="text-3xl md:text-4xl font-medium text-teal-50 tracking-tight">Gestion Médicale Simplifiée</h2>
            </div>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed opacity-95">Une application web complète pour la gestion des rendez-vous et des dossiers médicaux. Facilitez la prise de rendez-vous en ligne, la gestion des calendriers médicaux et la supervision des opérations cliniques.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
              <button onClick={() => navigate('/login')} className="px-10 py-4 bg-white rounded-xl text-xl font-bold hover:bg-teal-50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300" style={{ color: '#238D94' }}>Connexion</button>
              <button onClick={() => navigate('/register')} className="px-10 py-4 border-2 border-white text-white rounded-xl text-xl font-bold hover:bg-white/20 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">Inscription</button>
            </div>
            <div className="flex flex-wrap justify-center gap-12 mt-12 pt-8 border-t border-white/30">
              <Stat value="1000+" label="Patients" />
              <Stat value="50+" label="Médecins" />
              <Stat value="24/7" label="Support" />
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16 space-y-4">
          <p className="text-sm font-bold tracking-wider uppercase" style={{ color: '#238D94' }}>Fonctionnalités</p>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900">Tout pour Votre Clinique</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Une suite complète d outils pour moderniser votre établissement de santé</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (<Feature key={index} {...feature} />))}
        </div>
      </div>
      <div className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <p className="text-sm font-bold tracking-wider uppercase" style={{ color: '#238D94' }}>Pour Tous</p>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900">Une Solution Pour Chaque Rôle</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Interface personnalisée selon vos besoins</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-10 bg-gradient-to-br from-teal-50 to-teal-100 rounded-3xl border-2 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300" style={{ borderColor: '#238D94' }}>
              <div className="inline-flex p-4 rounded-2xl mb-6" style={{ background: '#238D94' }}><Users className="w-12 h-12 text-white" /></div>
              <h3 className="text-2xl font-black mb-6" style={{ color: '#1a6b70' }}>Médecins</h3>
              <div className="space-y-4">
                {['Planning optimisé', 'Dossiers patients complets', 'Prescriptions digitales', 'Suivi des traitements'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3"><div className="w-2 h-2 rounded-full" style={{ background: '#238D94' }}></div><p className="text-lg font-medium" style={{ color: '#1a6b70' }}>{item}</p></div>
                ))}
              </div>
            </div>
            <div className="p-10 bg-gradient-to-br from-green-50 to-green-100 rounded-3xl border-2 border-green-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <div className="inline-flex p-4 bg-green-600 rounded-2xl mb-6"><FileText className="w-12 h-12 text-white" /></div>
              <h3 className="text-2xl font-black text-green-900 mb-6">Patients</h3>
              <div className="space-y-4">
                {['Réservation 24/7', 'Historique médical', 'Rappels automatiques', 'Résultats d analyses'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-green-600"></div><p className="text-lg text-green-900 font-medium">{item}</p></div>
                ))}
              </div>
            </div>
            <div className="p-10 bg-gradient-to-br from-purple-50 to-purple-100 rounded-3xl border-2 border-purple-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <div className="inline-flex p-4 bg-purple-600 rounded-2xl mb-6"><Shield className="w-12 h-12 text-white" /></div>
              <h3 className="text-2xl font-black text-purple-900 mb-6">Personnel</h3>
              <div className="space-y-4">
                {['Supervision complète', 'Gestion des ressources', 'Rapports détaillés', 'Coordination d équipe'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-purple-600"></div><p className="text-lg text-purple-900 font-medium">{item}</p></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative text-white py-24 overflow-hidden" style={{ background: 'linear-gradient(to bottom right, #238D94, #1a6b70)' }}>
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_20px_20px,_white_2px,_transparent_0)] bg-[length:40px_40px]"></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-black">Prêt à Transformer Votre Clinique ?</h2>
          <p className="text-2xl leading-relaxed max-w-3xl mx-auto opacity-95">Rejoignez les établissements qui modernisent leur gestion avec CareFlow. Commencez dès aujourd hui.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button onClick={() => navigate('/register')} className="px-12 py-4 bg-white rounded-xl text-2xl font-bold hover:bg-teal-50 hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2" style={{ color: '#238D94' }}>Commencer Gratuitement<ArrowRight className="w-6 h-6" /></button>
            <button onClick={() => navigate('/login')} className="px-12 py-4 border-2 border-white text-white rounded-xl text-2xl font-bold hover:bg-white/20 hover:scale-105 transition-all duration-300">Voir une Démo</button>
          </div>
        </div>
      </div>
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="space-y-4"><h3 className="text-2xl font-black">CareFlow</h3><p className="text-gray-400 text-lg">La solution moderne pour la gestion médicale.</p></div>
            <div><h4 className="text-lg font-bold mb-4">Produit</h4><div className="space-y-3"><p className="text-gray-400 hover:text-teal-300 cursor-pointer text-lg">Fonctionnalités</p><p className="text-gray-400 hover:text-teal-300 cursor-pointer text-lg">Tarifs</p><p className="text-gray-400 hover:text-teal-300 cursor-pointer text-lg">Sécurité</p></div></div>
            <div><h4 className="text-lg font-bold mb-4">Entreprise</h4><div className="space-y-3"><p className="text-gray-400 hover:text-teal-300 cursor-pointer text-lg">À propos</p><p className="text-gray-400 hover:text-teal-300 cursor-pointer text-lg">Blog</p><p className="text-gray-400 hover:text-teal-300 cursor-pointer text-lg">Carrières</p></div></div>
            <div><h4 className="text-lg font-bold mb-4">Support</h4><div className="space-y-3"><p className="text-gray-400 hover:text-teal-300 cursor-pointer text-lg">Contact</p><p className="text-gray-400 hover:text-teal-300 cursor-pointer text-lg">Documentation</p><p className="text-gray-400 hover:text-teal-300 cursor-pointer text-lg">FAQ</p></div></div>
          </div>
          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-lg">© 2025 CareFlow. Tous droits réservés.</p>
            <div className="flex gap-6"><p className="text-gray-400 hover:text-teal-300 cursor-pointer text-lg">Confidentialité</p><p className="text-gray-400 hover:text-teal-300 cursor-pointer text-lg">Conditions</p><p className="text-gray-400 hover:text-teal-300 cursor-pointer text-lg">Cookies</p></div>
          </div>
        </div>
      </footer>
    </div>
  );
}
