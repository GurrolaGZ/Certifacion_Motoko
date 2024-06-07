import Array "mo:base/Array";
import Nat "mo:base/Nat";
import Text "mo:base/Text";

actor Reportlist {

  type Report = {
    id: Nat;
    title: Text;
    description: Text;
    ubication: Text;
  };

  var reports : [Report] = [
    {
       id = 1;
      title = "Fuga de Agua";
      description = "En la colonia Cumbres 2 hay una fuga muy grande agua que lleva varios dias";
      ubication = "Candelario Ramos Reyes, Las Cumbres 2 Aguascalientes, Mexico";
    }
  ];

  public func addReport(ubication: Text, title: Text, description: Text): async Bool {
    let newId = Array.size(reports) + 1;
    let newReport = {
      id = newId;
      title = title;
      description = description;
      ubication = ubication;
    };
    reports := Array.append<Report>(reports, [newReport]);
    return true;
  };

  public func getAllReports(): async [Report] {
    return reports;
  };

  public func getReportById(id: Nat): async ?Report {
    return Array.find<Report>(reports, func(r) { r.id == id });
  };

  public func updateReport(id: Nat, title: Text, description: Text, ubication: Text): async Bool {
    let reportToUpdate = Array.find<Report>(reports, func(report) { report.id == id });

    switch (reportToUpdate) {
      case (null) { return false };
      case (?report) {
        let updatedReport = {
          id = id;
          title = title;
          description = description;
          ubication = ubication;
        };
        reports := Array.map<Report, Report>(reports, func(r) { if (r.id == id) { updatedReport } else { r }});
        return true;
      };
    };
  };

  public func deleteReport(id: Nat): async Bool {
    let report = Array.find<Report>(reports, func(report) { report.id == id });
    if (report != null) {
      reports := Array.filter<Report>(reports, func(report) { report.id != id});
      return true;
    } else {
      return false;
    };
  };
};
