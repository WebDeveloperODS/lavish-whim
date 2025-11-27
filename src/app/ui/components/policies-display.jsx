import SectionHead1 from "./main-heading"
const SubHeadings = ({index,children}) => {
      return <div className="flex items-center gap-1">
            <h4 className="text-sm mt-[2px] font-bold">{index}.</h4>
            <h2 className="text-lg font-bold tracking-wider underline underline-offset-4 decoration-2 decoration-red-700">{children}</h2>
      </div>
}
const PointsDisplay = ({parentIndex, points = []}) => {
      return <ul className="mx-6">
            {
                  points.length > 1 ? points.map((point, index) => <li className="tracking-wide" key={index}>
                        <span className="text-sm mt-[2px] font-bold">{`${parentIndex}.${index+1})`}</span> {point}
                  </li> ) : <li className="tracking-wide">
                        {points[0]}
                  </li>
            }
      </ul>
}

export default function PoliciesDisplay({policies}){
      return <div className="container lg:px-28 2xl:px-[8vw] flex flex-col gap-3 py-6 lg:pt-14">
            <SectionHead1 className={'font-bold italic underline underline-offset-4'}>{policies.title}</SectionHead1>
            <h3 className="text-sm lg:text-md capitalize tracking-wide">
                  {policies.welcomeMsg}
            </h3>
            {
                  policies.points.map((child, index) => <div key={index} className="flex flex-col gap-2">
                  <SubHeadings index={index+1}>{child.heading}</SubHeadings>
                  <PointsDisplay parentIndex={index+1} points={child.childPoints}/>
            </div>)
            }
      </div>
}