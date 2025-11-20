import MainLayout from '../layouts/MainLayout';
import { ProfilePatient } from './patients/ProfilePatient';

export default function Profile() {
  return (
    <MainLayout>
      <ProfilePatient />
    </MainLayout>
  );
}
