import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';

export type IconProps = FontAwesomeIconProps;
export const Icon = (props: FontAwesomeIconProps) => <FontAwesomeIcon {...props} />;