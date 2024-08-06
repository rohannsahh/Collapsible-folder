

import React from 'react';
import Folder from './Folder';
import companyData from '../data/company.json';
import managementData from '../data/management.json';
import employeesData from '../data/employees.json';

const CompanyStructure = () => {
  return (
    <div className="p-2 my-2">
      <Folder name={companyData.name}>
        {companyData.children.map((childName, index) => {
          if (childName === 'Management') {
            return (
              <Folder key={index} name={managementData.name}>
                {managementData.children.map((item, subIndex) =>
                  item.type === 'leaf' ? (
                    <Folder key={subIndex} name={item.name} isLeaf>
                      {item}
                    </Folder>
                  ) : (
                    <Folder key={subIndex} name={item.name}>
                    </Folder>
                  )
                )}
              </Folder>
            );
          } else if (childName === 'Employees') {
            return (
              <Folder key={index} name={employeesData.name}>
                {employeesData.children.map((item, subIndex) =>
                  item.type === 'leaf' ? (
                    <Folder key={subIndex} name={item.name} isLeaf>
                      {item}
                    </Folder>
                  ) : (
                    <Folder key={subIndex} name={item.name}>
                    </Folder>
                  )
                )}
              </Folder>
            );
          }
          return null;
        })}
      </Folder>
    </div>
  );
};

export default CompanyStructure;
