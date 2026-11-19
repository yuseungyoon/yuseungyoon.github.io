import type { NotionComponentProps } from 'features/notion/types'

export function ChildDatabase(_props: NotionComponentProps<'child_database'>) {
  //데이터베이스 임베드 블록을 제공하지는 않습니다. 이름으로 데이터베이스를 쿼리해 따로 구현해야 합니다.
  return <div />
}
