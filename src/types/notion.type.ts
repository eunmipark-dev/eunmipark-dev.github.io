export interface Properties {
  id: UniqueIdProperty;
  url: TitleProperty;
  remark: RichTextProperty;
  created_date: DateProperty;
  edited_date: DateProperty;
  series: SelectProperty;
  tag: MultiSelectProperty;
}

interface Parent {
  type: string;
  database_id: string;
}

interface Children {
  object: 'block';
  id: string;
  created_time: string;
  last_edited_time: string;
  created_by: WorkBy;
  last_edited_by: WorkBy;
  cover: any;
  icon: any;
  parent: Parent;
  archived: boolean;
  properties: Properties;
  public_url: string;
  url: string;
  children: NotionChildrenType[];
  has_children: boolean;
  type: BlockType;
}

export interface NotionNode {
  id: string;
  databaseName: string;
  title: string;
  json: string;
  createdAt: string;
  updatedAt: string;
  notionColumn: NotionColumn;
}

export interface NotionColumn {
  id: number;
  remark: string;
  lastEditedTime: string;
  createdTime: string;
  notionUrl: string;
  tag?: MultiSelect;
  series?: Select;
}

export enum BlockType {
  PARAGRAPH = 'paragraph',
  HEADING_1 = 'heading_1',
  HEADING_2 = 'heading_2',
  HEADING_3 = 'heading_3',
  QUOTE = 'quote',
  BULLETED_LIST_ITEM = 'bulleted_list_item',
  NUMBERED_LIST_ITEM = 'numbered_list_item',
  TODO = 'to_do',
  CALLOUT = 'callout',
  TOGGLE = 'toggle',
  BOOKMARK = 'bookmark',
  CODE = 'code',
  IMAGE = 'image',
  DIVIDER = 'divider',
}

export interface ParagraphChildren extends Children {
  type: BlockType.PARAGRAPH;
  paragraph: TextBlock;
}
export interface BulletedListItemChildren extends Children {
  type: BlockType.BULLETED_LIST_ITEM;
  bulleted_list_item: TextBlock;
}
export interface NumberedListItemChildren extends Children {
  type: BlockType.NUMBERED_LIST_ITEM;
  numbered_list_item: TextBlock;
}
export interface Heading1Children extends Children {
  type: BlockType.HEADING_1;
  heading_1: Heading;
}
export interface Heading2Children extends Children {
  type: BlockType.HEADING_2;
  heading_2: Heading;
}
export interface Heading3Children extends Children {
  type: BlockType.HEADING_3;
  heading_3: Heading;
}
export interface QuoteChildren extends Children {
  type: BlockType.QUOTE;
  quote: TextBlock;
}
export interface TodoChildren extends Children {
  type: BlockType.TODO;
  to_do: Todo;
}
export interface CalloutChildren extends Children {
  type: BlockType.CALLOUT;
  callout: Callout;
}
export interface ToggleChildren extends Children {
  type: BlockType.TOGGLE;
  toggle: TextBlock;
}
export interface BookmarkChildren extends Children {
  type: BlockType.BOOKMARK;
  bookmark: Bookmark;
}
export interface CodeChildren extends Children {
  type: BlockType.CODE;
  code: Code;
}
export interface ImageChildren extends Children {
  type: BlockType.IMAGE;
  image: Image;
}
export interface DividerChildren extends Children {
  type: BlockType.DIVIDER;
  divider: {};
}

export type NotionChildrenType =
  | ParagraphChildren
  | BulletedListItemChildren
  | NumberedListItemChildren
  | Heading1Children
  | Heading2Children
  | Heading3Children
  | QuoteChildren
  | TodoChildren
  | CalloutChildren
  | ToggleChildren
  | BookmarkChildren
  | CodeChildren
  | ImageChildren
  | DividerChildren;

export interface UniqueIdProperty {
  type: 'unique_id';
  unique_id: UniqueId;
}

export interface TitleProperty {
  type: 'title';
  title: TextItem;
}

export interface MultiSelectProperty {
  type: 'multi_select';
  multi_select: MultiSelect;
}

export interface RichTextProperty {
  type: 'rich_text';
  rich_text: RichText;
}

export interface DateProperty {
  type: 'date';
  date: PropDate;
}

export interface SelectProperty {
  type: 'select';
  select: Select;
}

export interface NumberProperty {
  type: 'number';
  number: number;
}

export type MultiSelect = Select[];
export type RichText = TextItem[];
export type Caption = TextItem[];

export interface WorkBy {
  object: string;
  id: string;
}

export interface UniqueId {
  prefix: string;
  number: number;
}

export interface Select {
  id: string;
  name: string;
  color: string;
}

export interface TextItem {
  type: string;
  text: Text;
  annotations: Annotations;
  plain_text: string;
  href?: string;
}

export interface Annotations {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: string;
}

export interface Url {
  id: string;
  type: string;
  rich_text: string;
}

export interface Text {
  content: string;
  link: any;
}

export interface Heading {
  color: string;
  rich_text: RichText;
}

export interface TextBlock {
  color: string;
  rich_text: RichText;
}

export interface Todo extends TextBlock {
  checked: boolean;
}

export interface CalloutIcon {
  emoji: string;
  type: 'emoji';
}
export interface Callout extends TextBlock {
  icon: CalloutIcon;
}

export interface Bookmark {
  caption: Caption;
  url: string;
}

export interface Code {
  caption: Caption;
  language: string;
  rich_text: RichText;
}

export interface Image {
  caption: Caption;
  file: ImageFile;
  type: 'file';
}

export interface ImageFile {
  expiry_time: string;
  url: string;
}

export interface PropDate {
  end: string;
  start: string;
  time_zone?: string;
}
