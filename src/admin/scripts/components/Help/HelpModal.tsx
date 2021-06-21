import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';

import { Dialog } from '../ui';

interface HelpModalProps {
	open: boolean;
	onToggle: (open: boolean) => void;
}

const HelpModal = ({ open, onToggle }: HelpModalProps) => {
	const [isOpen, setOpen] = useState(open);

	useEffect(() => setOpen(open), [open]);
	useEffect(() => onToggle(isOpen), [isOpen]);

	return (
		<>
			<Dialog.Wrapper
				open={isOpen}
				onToggle={(open) => setOpen(open)}
				headerChildren={<>Help</>}
				footerChildren={
					<>
						<Button onClick={() => setOpen(false)} color="primary">
							Cancel
						</Button>
					</>
				}
				customContent={
					<div>
						<p>
							Dictum facilisis baH luctus luctus ut vestibulum walrus odio ut
							posuere vestibulum facilisis ut amet. Pellentesque baH amet proin
							baH in vulputate felis cras velit eros baktag Dhak'tah curae
							hur'q. Vulputate vulputate ac neque eu tellus mullamcorper cras
							elit eros vestibulum eu morbi metus magna. Ut dignissim tortor
							zadek adanji nulla ante Dhak'tah tristique phasellus tortor primis
							nulla et dolor. Vestibulum proin adanji tellus adanji accumsan
							ghoptu primis jak'tahla hur'q amet morbi feugiat lacinia orci. At
							dignissim at velit elit eros odio orci lacinia aliquam orci
							pellentesque amet lorem facilisis. Rhoncus venenatis aliquam
							pellentesque hur'q volutpat et neque baktag a morbi interdum ut a
							lacinia. Non ultrices iaculis walrus vulputate vestibulum luctus
							ut tristique tellus honcus zadek dictum feugiat eu. Amet morbi in
							neque velit in cubilia eros sit interdum cubilia ut honcus nulla
							baH. In morbi odio jak'tahla tristique non orci a neque fringilla
							honcus in eu et adipiscing.
							<br />
							Eu proin orci ipsum rhoncus fringilla sed mullamcorper in
							jak'tahla ac aliquam lacus sit sit. Morbi odio ut orci ac ut he'
							HImaH velit a ultricies lacinia nulla adanji nisi eu. Ultricies
							ante amet orci lorem luctus nec sed mullamcorper hur'q hur'q ac
							nisi adipiscing in. Proin dignissim lacinia eros felis lorem
							maximus posuere mi sed rhoncus ultrices velit zadek ultricies.
							Ante eros eros metus at accumsan mullamcorper ipsum ipsum maximus
							felis a adanji lacus feugiat. Tristique velit tortor proin amet
							velit tortor nisi proin sit interdum ipsum jak'tahla proin nulla.
							Nulla velit vestibulum dignissim cras cubilia accumsan honcus vel
							phasellus ante tellus luctus et neque. Felis felis luctus metus
							ghoptu volutpat he' HImaH morbi orci at rhoncus ultrices fermentum
							vestibulum orci. Vestibulum ac posuere baktag morbi mullamcorper
							aliquam felis he' HImaH vestibulum adanji neque phasellus
							mullamcorper he' HImaH. Posuere elit pellentesque sed felis et
							dignissim ac ultricies sed nec ut lacinia tortor ipsum.
							<br />
							Nulla eros orci lacus d'akturak he' HImaH nulla accumsan orci
							ipsum sit orci ipsum adipiscing maximus. Nisi ultrices adipiscing
							ghoptu nisi eros ghoptu non he' HImaH he' HImaH a luctus d'akturak
							neque cras. Interdum Dhak'tah tristique Dhak'tah augue jak'tahla
							d'akturak venenatis hur'q vulputate at non luctus pulvinar
							accumsan. Rhoncus luctus orci proin lacinia mullamcorper
							pellentesque Dhak'tah morbi honcus tellus eu phasellus ipsum
							adanji. Orci iaculis vel consectetur luctus d'akturak vestibulum
							ultricies maximus he' HImaH tortor augue rhoncus tristique zadek.
							At ipsum jak'tahla accumsan ipsum at eros aliquam vestibulum
							lacinia velit k'adio cras luctus sit. Felis metus a primis amet
							volutpat sed k'adio augue at augue k'adio morbi tortor morbi. Eu
							feugiat vel mi venenatis nulla aliquam dignissim vulputate
							accumsan vulputate pellentesque sit leo metus. Nulla k'adio
							interdum hur'q facilisis ac ipsum ante accumsan ut felis baH cras
							iaculis leo. Consectetur tincidunt eros et he' HImaH eu mi lorem
							augue feugiat ultrices accumsan eu ultricies vestibulum.
						</p>
						<p>
							Dictum facilisis baH luctus luctus ut vestibulum walrus odio ut
							posuere vestibulum facilisis ut amet. Pellentesque baH amet proin
							baH in vulputate felis cras velit eros baktag Dhak'tah curae
							hur'q. Vulputate vulputate ac neque eu tellus mullamcorper cras
							elit eros vestibulum eu morbi metus magna. Ut dignissim tortor
							zadek adanji nulla ante Dhak'tah tristique phasellus tortor primis
							nulla et dolor. Vestibulum proin adanji tellus adanji accumsan
							ghoptu primis jak'tahla hur'q amet morbi feugiat lacinia orci. At
							dignissim at velit elit eros odio orci lacinia aliquam orci
							pellentesque amet lorem facilisis. Rhoncus venenatis aliquam
							pellentesque hur'q volutpat et neque baktag a morbi interdum ut a
							lacinia. Non ultrices iaculis walrus vulputate vestibulum luctus
							ut tristique tellus honcus zadek dictum feugiat eu. Amet morbi in
							neque velit in cubilia eros sit interdum cubilia ut honcus nulla
							baH. In morbi odio jak'tahla tristique non orci a neque fringilla
							honcus in eu et adipiscing.
							<br />
							Eu proin orci ipsum rhoncus fringilla sed mullamcorper in
							jak'tahla ac aliquam lacus sit sit. Morbi odio ut orci ac ut he'
							HImaH velit a ultricies lacinia nulla adanji nisi eu. Ultricies
							ante amet orci lorem luctus nec sed mullamcorper hur'q hur'q ac
							nisi adipiscing in. Proin dignissim lacinia eros felis lorem
							maximus posuere mi sed rhoncus ultrices velit zadek ultricies.
							Ante eros eros metus at accumsan mullamcorper ipsum ipsum maximus
							felis a adanji lacus feugiat. Tristique velit tortor proin amet
							velit tortor nisi proin sit interdum ipsum jak'tahla proin nulla.
							Nulla velit vestibulum dignissim cras cubilia accumsan honcus vel
							phasellus ante tellus luctus et neque. Felis felis luctus metus
							ghoptu volutpat he' HImaH morbi orci at rhoncus ultrices fermentum
							vestibulum orci. Vestibulum ac posuere baktag morbi mullamcorper
							aliquam felis he' HImaH vestibulum adanji neque phasellus
							mullamcorper he' HImaH. Posuere elit pellentesque sed felis et
							dignissim ac ultricies sed nec ut lacinia tortor ipsum.
							<br />
							Nulla eros orci lacus d'akturak he' HImaH nulla accumsan orci
							ipsum sit orci ipsum adipiscing maximus. Nisi ultrices adipiscing
							ghoptu nisi eros ghoptu non he' HImaH he' HImaH a luctus d'akturak
							neque cras. Interdum Dhak'tah tristique Dhak'tah augue jak'tahla
							d'akturak venenatis hur'q vulputate at non luctus pulvinar
							accumsan. Rhoncus luctus orci proin lacinia mullamcorper
							pellentesque Dhak'tah morbi honcus tellus eu phasellus ipsum
							adanji. Orci iaculis vel consectetur luctus d'akturak vestibulum
							ultricies maximus he' HImaH tortor augue rhoncus tristique zadek.
							At ipsum jak'tahla accumsan ipsum at eros aliquam vestibulum
							lacinia velit k'adio cras luctus sit. Felis metus a primis amet
							volutpat sed k'adio augue at augue k'adio morbi tortor morbi. Eu
							feugiat vel mi venenatis nulla aliquam dignissim vulputate
							accumsan vulputate pellentesque sit leo metus. Nulla k'adio
							interdum hur'q facilisis ac ipsum ante accumsan ut felis baH cras
							iaculis leo. Consectetur tincidunt eros et he' HImaH eu mi lorem
							augue feugiat ultrices accumsan eu ultricies vestibulum.
						</p>
						<p>
							Dictum facilisis baH luctus luctus ut vestibulum walrus odio ut
							posuere vestibulum facilisis ut amet. Pellentesque baH amet proin
							baH in vulputate felis cras velit eros baktag Dhak'tah curae
							hur'q. Vulputate vulputate ac neque eu tellus mullamcorper cras
							elit eros vestibulum eu morbi metus magna. Ut dignissim tortor
							zadek adanji nulla ante Dhak'tah tristique phasellus tortor primis
							nulla et dolor. Vestibulum proin adanji tellus adanji accumsan
							ghoptu primis jak'tahla hur'q amet morbi feugiat lacinia orci. At
							dignissim at velit elit eros odio orci lacinia aliquam orci
							pellentesque amet lorem facilisis. Rhoncus venenatis aliquam
							pellentesque hur'q volutpat et neque baktag a morbi interdum ut a
							lacinia. Non ultrices iaculis walrus vulputate vestibulum luctus
							ut tristique tellus honcus zadek dictum feugiat eu. Amet morbi in
							neque velit in cubilia eros sit interdum cubilia ut honcus nulla
							baH. In morbi odio jak'tahla tristique non orci a neque fringilla
							honcus in eu et adipiscing.
							<br />
							Eu proin orci ipsum rhoncus fringilla sed mullamcorper in
							jak'tahla ac aliquam lacus sit sit. Morbi odio ut orci ac ut he'
							HImaH velit a ultricies lacinia nulla adanji nisi eu. Ultricies
							ante amet orci lorem luctus nec sed mullamcorper hur'q hur'q ac
							nisi adipiscing in. Proin dignissim lacinia eros felis lorem
							maximus posuere mi sed rhoncus ultrices velit zadek ultricies.
							Ante eros eros metus at accumsan mullamcorper ipsum ipsum maximus
							felis a adanji lacus feugiat. Tristique velit tortor proin amet
							velit tortor nisi proin sit interdum ipsum jak'tahla proin nulla.
							Nulla velit vestibulum dignissim cras cubilia accumsan honcus vel
							phasellus ante tellus luctus et neque. Felis felis luctus metus
							ghoptu volutpat he' HImaH morbi orci at rhoncus ultrices fermentum
							vestibulum orci. Vestibulum ac posuere baktag morbi mullamcorper
							aliquam felis he' HImaH vestibulum adanji neque phasellus
							mullamcorper he' HImaH. Posuere elit pellentesque sed felis et
							dignissim ac ultricies sed nec ut lacinia tortor ipsum.
							<br />
							Nulla eros orci lacus d'akturak he' HImaH nulla accumsan orci
							ipsum sit orci ipsum adipiscing maximus. Nisi ultrices adipiscing
							ghoptu nisi eros ghoptu non he' HImaH he' HImaH a luctus d'akturak
							neque cras. Interdum Dhak'tah tristique Dhak'tah augue jak'tahla
							d'akturak venenatis hur'q vulputate at non luctus pulvinar
							accumsan. Rhoncus luctus orci proin lacinia mullamcorper
							pellentesque Dhak'tah morbi honcus tellus eu phasellus ipsum
							adanji. Orci iaculis vel consectetur luctus d'akturak vestibulum
							ultricies maximus he' HImaH tortor augue rhoncus tristique zadek.
							At ipsum jak'tahla accumsan ipsum at eros aliquam vestibulum
							lacinia velit k'adio cras luctus sit. Felis metus a primis amet
							volutpat sed k'adio augue at augue k'adio morbi tortor morbi. Eu
							feugiat vel mi venenatis nulla aliquam dignissim vulputate
							accumsan vulputate pellentesque sit leo metus. Nulla k'adio
							interdum hur'q facilisis ac ipsum ante accumsan ut felis baH cras
							iaculis leo. Consectetur tincidunt eros et he' HImaH eu mi lorem
							augue feugiat ultrices accumsan eu ultricies vestibulum.
						</p>
					</div>
				}
			/>
		</>
	);
};

export default HelpModal;
