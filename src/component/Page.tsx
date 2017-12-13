import * as React from 'react'
export interface HelloProps { compiler: string; framework: string; }
export class Page extends React.Component<HelloProps, any> {
    render() {
        return (
            <div className="hello">Hello { this.name }</div>
        )
    }
}