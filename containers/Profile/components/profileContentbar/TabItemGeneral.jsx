import ResumeSection from '@/components/general/ResumeSection'
import EducationInfoSection from '@/components/general/EducationInfoSection'
import Certificate from '@/components/general/CertificateSection'
import { useEffect, useState } from 'react'
import { getAPI } from '@/services/fetchAPI'

import SkillsSection from '@/components/general/SkillsSection'
import LanguageSection from '@/components/general/LanguageSection'

const TabItemsGeneral = () => {
  const id = '669fec07fd9d9fc6511f8e3f'
  const [profileInfo, setProfileInfo] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const getProfile = async () => {
      const result = await getAPI(`/profile/${id}/get-profile`)
      console.log(result)
      setProfileInfo(result.data)
      setLoading(false)
    }
    getProfile()
  }, [loading])
  return (
    !loading && (
      <div className="lg:h-[calc(100vh_-_200px)] w-full mx-auto lg:overflow-y-scroll top-0 bottom-0  flex flex-col gap-3 pt-5   ">
        <ResumeSection mockData={profileInfo} loading={loading} />
        <EducationInfoSection mockData={profileInfo} />
        <Certificate mockData={profileInfo} />
        <SkillsSection data={profileInfo} />
        <LanguageSection data={profileInfo} />
      </div>
    )
  )
}

export default TabItemsGeneral
