import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../../constants';
import Layout from '../../components/Layout';
import { Section } from '../../components/ui';
import Confirm from '../../components/Confirm';

const DashboardPage = () => {
	const [modalOpen, setModalOpen] = useState(false);
	const { t } = useTranslation('page');

	const toggleModal = () => setModalOpen(!modalOpen);

	return (
		<Layout.Default
			route={ROUTES.app.dashboard}
			titlePage={t('page:Dashboard.page.title')}
			titleMeta={t('page:Dashboard.meta.title')}
		>
			<Section>
				<div>...DashboardPage...</div>
			</Section>
			{/* =========== DEMO =========== */}
			<Section title="Demo confirm modal">
				<div>
					<button type="button" onClick={toggleModal}>
						open modal
					</button>
					<Confirm
						open={modalOpen}
						onToggle={(open) => setModalOpen(open)}
						onConfirm={() => {
							console.log('onConfirm callback');
						}}
						onCancel={() => {
							console.log('onCancel callback');
						}}
						title="Are you sure?"
					>
						<>
							Confirm content ...
							<p>
								A ghoptu he' HImaH venenatis ipsum fringilla leo vestibulum
								lacinia nulla velit luctus eros walrus a. Magna orci vel morbi
								baktag baktag sed vel nec nulla in baH baH mi sit. Vestibulum
								facilisis posuere ante eros ut vestibulum lacus ipsum in morbi
								ultricies interdum a in. Elit venenatis tellus velit in augue
								fringilla lacinia facilisis non d'blok ultrices mi et in. Ac
								lacinia et sit tristique dictum tellus ultrices felis a
								mullamcorper venenatis felis he' HImaH ut. BaH leo eu ipsum cras
								ac vestibulum lorem amet velit mi eros d'blok sed sed. Sed nulla
								tortor aliquam felis jak'tahla orci neque eros tincidunt d'blok
								venenatis cras vel ante. Felis lacinia facilisis mullamcorper
								tellus dignissim rhoncus nec a proin rhoncus dignissim fringilla
								tellus facilisis. Jak'tahla accumsan neque d'akturak zadek mi
								facilisis leo morbi tellus Dhak'tah ultricies tristique nulla
								eros. He' HImaH Dhak'tah he' HImaH neque augue metus primis
								adipiscing honcus velit dignissim morbi at luctus nulla.
								<br />
								Vestibulum facilisis honcus lacinia tristique a orci tincidunt
								elit amet velit ac luctus nulla eros. Facilisis lorem honcus
								iaculis vulputate d'akturak adanji ipsum proin eros iaculis et
								adipiscing nisi feugiat. Curae maximus orci ac nulla neque cras
								baH felis in pulvinar sed nec in volutpat. Ultrices venenatis
								zadek posuere walrus ghoptu cras maximus ut ac elit faucibus
								consectetur volutpat at. BaH pellentesque vulputate vulputate
								morbi orci aliquam volutpat odio sit orci dignissim vestibulum
								lorem felis. Mi morbi phasellus ultricies adipiscing in lacus
								nisi Dhak'tah aliquam nulla at felis amet lacinia. Sit phasellus
								a cras sit honcus nisi odio tellus ante vulputate d'akturak
								luctus elit in. Iaculis nisi dignissim maximus sit ipsum lorem
								maximus nulla amet luctus et ante proin pulvinar. Vel ac iaculis
								tincidunt primis nec facilisis phasellus ac ut curae in
								venenatis k'adio dignissim. Et orci velit velit lorem at baktag
								maximus mullamcorper ante ac venenatis dictum nisi nulla.
							</p>
						</>
					</Confirm>
				</div>
			</Section>
			{/* =========== DEMO =========== */}
		</Layout.Default>
	);
};

export default DashboardPage;
